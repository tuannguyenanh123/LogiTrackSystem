import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateTransaction } from './dtos/create.dto'
import { TransactionQueryDto } from './dtos/query.dto'
import { UpdateTransaction } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { TransactionEntity } from './entity/transaction.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TransactionEntity })
  @Post()
  create(@Body() createTransactionDto: CreateTransaction, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createTransactionDto.uid)
    return this.prisma.transaction.create({ data: createTransactionDto })
  }

  @ApiOkResponse({ type: [TransactionEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: TransactionQueryDto) {
    return this.prisma.transaction.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: TransactionEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.transaction.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: TransactionEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransaction,
    @GetUser() user: GetUserType,
  ) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id } })
    checkRowLevelPermission(user, transaction.uid)
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id } })
    checkRowLevelPermission(user, transaction.uid)
    return this.prisma.transaction.delete({ where: { id } })
  }
}
