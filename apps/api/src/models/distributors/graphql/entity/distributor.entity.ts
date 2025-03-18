import { ObjectType } from '@nestjs/graphql'
import { Distributor as DistributorType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Distributor implements RestrictProperties<Distributor,DistributorType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
