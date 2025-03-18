import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class LocationWhereUniqueInput {
  id: number
}

@InputType()
export class LocationWhereInputStrict implements RestrictProperties<LocationWhereInputStrict, Prisma.LocationWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: LocationWhereInput[]
  OR: LocationWhereInput[]
  NOT: LocationWhereInput[]
}

@InputType()
export class LocationWhereInput extends PartialType(
  LocationWhereInputStrict,
) {}

@InputType()
export class LocationListRelationFilter {
  every?: LocationWhereInput
  some?: LocationWhereInput
  none?: LocationWhereInput
}

@InputType()
export class LocationRelationFilter {
  is?: LocationWhereInput
  isNot?: LocationWhereInput
}
