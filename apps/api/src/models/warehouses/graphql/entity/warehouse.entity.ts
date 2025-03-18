import { ObjectType } from '@nestjs/graphql'
import { Warehouse as WarehouseType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Warehouse implements RestrictProperties<Warehouse,WarehouseType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
