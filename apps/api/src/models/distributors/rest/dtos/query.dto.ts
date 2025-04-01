import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class DistributorQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.DistributorScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.DistributorScalarFieldEnum))
  searchBy?: string
}
