import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateRetailer } from './dtos/create.dto'
import { RetailerQueryDto } from './dtos/query.dto'
import { UpdateRetailer } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { RetailerEntity } from './entity/retailer.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('retailers')
@Controller('retailers')
export class RetailersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RetailerEntity })
  @Post()
  create(@Body() createRetailerDto: CreateRetailer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createRetailerDto.uid)
    return this.prisma.retailer.create({ data: createRetailerDto })
  }

  @ApiOkResponse({ type: [RetailerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: RetailerQueryDto) {
    return this.prisma.retailer.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: RetailerEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.retailer.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: RetailerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRetailerDto: UpdateRetailer,
    @GetUser() user: GetUserType,
  ) {
    const retailer = await this.prisma.retailer.findUnique({ where: { id } })
    checkRowLevelPermission(user, retailer.uid)
    return this.prisma.retailer.update({
      where: { id },
      data: updateRetailerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const retailer = await this.prisma.retailer.findUnique({ where: { id } })
    checkRowLevelPermission(user, retailer.uid)
    return this.prisma.retailer.delete({ where: { id } })
  }
}
