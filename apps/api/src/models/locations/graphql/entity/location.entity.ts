import { Field, ObjectType } from '@nestjs/graphql'
import { Location as LocationType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Location implements RestrictProperties<Location, LocationType> {
  id: number
  @Field({ nullable: true })
  latitude: number
  @Field({ nullable: true })
  longitude: number
  address: string
  warehouseId: number
}
