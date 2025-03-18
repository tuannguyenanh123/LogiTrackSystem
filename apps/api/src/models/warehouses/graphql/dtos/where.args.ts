import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class WarehouseWhereUniqueInput {
  id: number
}

@InputType()
export class WarehouseWhereInputStrict implements RestrictProperties<WarehouseWhereInputStrict, Prisma.WarehouseWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: WarehouseWhereInput[]
  OR: WarehouseWhereInput[]
  NOT: WarehouseWhereInput[]
}

@InputType()
export class WarehouseWhereInput extends PartialType(
  WarehouseWhereInputStrict,
) {}

@InputType()
export class WarehouseListRelationFilter {
  every?: WarehouseWhereInput
  some?: WarehouseWhereInput
  none?: WarehouseWhereInput
}

@InputType()
export class WarehouseRelationFilter {
  is?: WarehouseWhereInput
  isNot?: WarehouseWhereInput
}
