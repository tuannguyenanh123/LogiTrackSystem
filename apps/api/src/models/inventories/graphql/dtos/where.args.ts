import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class InventoryWhereUniqueInput {
  id: number
}

@InputType()
export class InventoryWhereInputStrict implements RestrictProperties<InventoryWhereInputStrict, Prisma.InventoryWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: InventoryWhereInput[]
  OR: InventoryWhereInput[]
  NOT: InventoryWhereInput[]
}

@InputType()
export class InventoryWhereInput extends PartialType(
  InventoryWhereInputStrict,
) {}

@InputType()
export class InventoryListRelationFilter {
  every?: InventoryWhereInput
  some?: InventoryWhereInput
  none?: InventoryWhereInput
}

@InputType()
export class InventoryRelationFilter {
  is?: InventoryWhereInput
  isNot?: InventoryWhereInput
}
