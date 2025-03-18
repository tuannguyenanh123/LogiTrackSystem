import { PartialType } from '@nestjs/swagger'
import { CreateDistributor } from './create.dto'
import { Distributor } from '@prisma/client'

export class UpdateDistributor extends PartialType(CreateDistributor) {
  id: Distributor['id']
}

