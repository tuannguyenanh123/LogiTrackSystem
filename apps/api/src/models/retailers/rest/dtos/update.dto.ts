import { PartialType } from '@nestjs/swagger'
import { CreateRetailer } from './create.dto'
import { Retailer } from '@prisma/client'

export class UpdateRetailer extends PartialType(CreateRetailer) {
  id: Retailer['id']
}

