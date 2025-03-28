import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateDistributor } from './dtos/create.dto'
import { DistributorQueryDto } from './dtos/query.dto'
import { UpdateDistributor } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { DistributorEntity } from './entity/distributor.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'

@ApiTags('distributors')
@Controller('distributors')
export class DistributorsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DistributorEntity })
  @Post()
  create(
    @Body() createDistributorDto: CreateDistributor,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createDistributorDto.uid)
    return this.prisma.distributor.create({ data: createDistributorDto })
  }

  @ApiOkResponse({ type: [DistributorEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: DistributorQueryDto) {
    return this.prisma.distributor.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: DistributorEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.distributor.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: DistributorEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateDistributorDto: UpdateDistributor,
    @GetUser() user: GetUserType,
  ) {
    const distributor = await this.prisma.distributor.findUnique({
      where: { uid },
    })
    checkRowLevelPermission(user, distributor.uid)
    return this.prisma.distributor.update({
      where: { uid },
      data: updateDistributorDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const distributor = await this.prisma.distributor.findUnique({
      where: { uid },
    })
    checkRowLevelPermission(user, distributor.uid)
    return this.prisma.distributor.delete({ where: { uid } })
  }
}
