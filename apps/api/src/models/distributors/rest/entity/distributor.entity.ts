import { Distributor } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class DistributorEntity
  implements RestrictProperties<DistributorEntity, Distributor>
{
  uid: string
  createdAt: Date
  updatedAt: Date
}
