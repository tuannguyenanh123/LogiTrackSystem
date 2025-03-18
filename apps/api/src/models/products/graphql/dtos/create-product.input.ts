import { InputType, OmitType } from '@nestjs/graphql'
import { Product } from '../entity/product.entity'

@InputType()
export class CreateProductInput extends OmitType(
  Product,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
