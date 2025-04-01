import { ObjectType } from '@nestjs/graphql'
import { Retailer as RetailerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Retailer implements RestrictProperties<Retailer, RetailerType> {
  uid: string
  createdAt: Date
  updatedAt: Date
}
