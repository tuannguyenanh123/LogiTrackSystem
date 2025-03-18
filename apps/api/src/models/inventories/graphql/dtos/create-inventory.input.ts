import { InputType, PickType } from '@nestjs/graphql'
import { Inventory } from '../entity/inventory.entity'

@InputType()
export class CreateInventoryInput extends PickType(
  Inventory,
  ['productId', 'warehouseId', 'quantity'],
  InputType,
) {}
