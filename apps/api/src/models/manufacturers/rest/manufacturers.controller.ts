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
import { CreateManufacturer } from './dtos/create.dto'
import { ManufacturerQueryDto } from './dtos/query.dto'
import { UpdateManufacturer } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ManufacturerEntity } from './entity/manufacturer.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from '@foundation/util/types'
import { checkRowLevelPermission } from 'src/common/auth/util'

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ManufacturerEntity })
  @Post()
  create(
    @Body() createManufacturerDto: CreateManufacturer,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createManufacturerDto.uid)
    return this.prisma.manufacturer.create({ data: createManufacturerDto })
  }

  @ApiOkResponse({ type: [ManufacturerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ManufacturerQueryDto) {
    return this.prisma.manufacturer.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ManufacturerEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.manufacturer.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: ManufacturerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateManufacturerDto: UpdateManufacturer,
    @GetUser() user: GetUserType,
  ) {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { uid },
    })
    checkRowLevelPermission(user, manufacturer.uid)
    return this.prisma.manufacturer.update({
      where: { uid },
      data: updateManufacturerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { uid },
    })
    checkRowLevelPermission(user, manufacturer.uid)
    return this.prisma.manufacturer.delete({ where: { uid } })
  }
}
