import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class RetailerWhereUniqueInput {
  id: number
}

@InputType()
export class RetailerWhereInputStrict implements RestrictProperties<RetailerWhereInputStrict, Prisma.RetailerWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: RetailerWhereInput[]
  OR: RetailerWhereInput[]
  NOT: RetailerWhereInput[]
}

@InputType()
export class RetailerWhereInput extends PartialType(
  RetailerWhereInputStrict,
) {}

@InputType()
export class RetailerListRelationFilter {
  every?: RetailerWhereInput
  some?: RetailerWhereInput
  none?: RetailerWhereInput
}

@InputType()
export class RetailerRelationFilter {
  is?: RetailerWhereInput
  isNot?: RetailerWhereInput
}
