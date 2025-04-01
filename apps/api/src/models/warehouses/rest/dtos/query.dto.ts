import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class WarehouseQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.WarehouseScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.WarehouseScalarFieldEnum))
  searchBy?: string
}
