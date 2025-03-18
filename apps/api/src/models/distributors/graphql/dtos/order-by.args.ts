import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class DistributorOrderByWithRelationInputStrict
  implements RestrictProperties<DistributorOrderByWithRelationInputStrict, Prisma.DistributorOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class DistributorOrderByWithRelationInput extends PartialType(
  DistributorOrderByWithRelationInputStrict,
) {}

@InputType()
export class DistributorOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
