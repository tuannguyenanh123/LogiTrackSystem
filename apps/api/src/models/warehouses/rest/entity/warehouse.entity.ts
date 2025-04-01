import { Warehouse } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class WarehouseEntity
  implements RestrictProperties<WarehouseEntity, Warehouse>
{
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  @IsOptional()
  description: string
  @IsOptional()
  manufacturerId: string
  @IsOptional()
  distributorId: string
  @IsOptional()
  retailerId: string
}
