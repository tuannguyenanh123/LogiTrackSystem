import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class RetailerOrderByWithRelationInputStrict
  implements RestrictProperties<RetailerOrderByWithRelationInputStrict, Prisma.RetailerOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class RetailerOrderByWithRelationInput extends PartialType(
  RetailerOrderByWithRelationInputStrict,
) {}

@InputType()
export class RetailerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
