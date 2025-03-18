import { ObjectType } from '@nestjs/graphql'
import { Retailer as RetailerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Retailer implements RestrictProperties<Retailer,RetailerType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
