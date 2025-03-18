import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class InventoryOrderByWithRelationInputStrict
  implements RestrictProperties<InventoryOrderByWithRelationInputStrict, Prisma.InventoryOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class InventoryOrderByWithRelationInput extends PartialType(
  InventoryOrderByWithRelationInputStrict,
) {}

@InputType()
export class InventoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
