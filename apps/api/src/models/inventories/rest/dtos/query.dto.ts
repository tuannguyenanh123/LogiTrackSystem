import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class InventoryQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.InventoryScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.InventoryScalarFieldEnum))
  searchBy?: string
}
