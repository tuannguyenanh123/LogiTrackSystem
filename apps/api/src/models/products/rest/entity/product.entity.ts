import { Product } from '@prisma/client'
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ProductEntity
  implements RestrictProperties<ProductEntity, Product>
{
  id: number
  createdAt: Date
  updatedAt: Date
  @IsOptional()
  name: string
  @IsOptional()
  description: string
  image: string
  manufacturerUid: string
}
