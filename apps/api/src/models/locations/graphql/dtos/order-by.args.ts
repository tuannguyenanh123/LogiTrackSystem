import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class LocationOrderByWithRelationInputStrict
  implements RestrictProperties<LocationOrderByWithRelationInputStrict, Prisma.LocationOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class LocationOrderByWithRelationInput extends PartialType(
  LocationOrderByWithRelationInputStrict,
) {}

@InputType()
export class LocationOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
