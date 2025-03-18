import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class DistributorWhereUniqueInput {
  id: number
}

@InputType()
export class DistributorWhereInputStrict implements RestrictProperties<DistributorWhereInputStrict, Prisma.DistributorWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: DistributorWhereInput[]
  OR: DistributorWhereInput[]
  NOT: DistributorWhereInput[]
}

@InputType()
export class DistributorWhereInput extends PartialType(
  DistributorWhereInputStrict,
) {}

@InputType()
export class DistributorListRelationFilter {
  every?: DistributorWhereInput
  some?: DistributorWhereInput
  none?: DistributorWhereInput
}

@InputType()
export class DistributorRelationFilter {
  is?: DistributorWhereInput
  isNot?: DistributorWhereInput
}
