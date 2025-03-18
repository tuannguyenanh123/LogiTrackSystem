import { ObjectType } from '@nestjs/graphql'
import { Inventory as InventoryType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Inventory implements RestrictProperties<Inventory,InventoryType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
