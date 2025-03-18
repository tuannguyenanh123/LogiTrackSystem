import { Retailer } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class RetailerEntity
  implements RestrictProperties<RetailerEntity, Retailer>
{
  uid: string
  createdAt: Date
  updatedAt: Date
}
