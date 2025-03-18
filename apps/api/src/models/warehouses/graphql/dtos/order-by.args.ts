import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class WarehouseOrderByWithRelationInputStrict
  implements RestrictProperties<WarehouseOrderByWithRelationInputStrict, Prisma.WarehouseOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class WarehouseOrderByWithRelationInput extends PartialType(
  WarehouseOrderByWithRelationInputStrict,
) {}

@InputType()
export class WarehouseOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
