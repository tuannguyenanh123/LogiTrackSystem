import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DistributorsService } from './distributors.service'
import { Distributor } from './entity/distributor.entity'
import { FindManyDistributorArgs, FindUniqueDistributorArgs } from './dtos/find.args'
import { CreateDistributorInput } from './dtos/create-distributor.input'
import { UpdateDistributorInput } from './dtos/update-distributor.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Distributor)
export class DistributorsResolver {
  constructor(private readonly distributorsService: DistributorsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Distributor)
  createDistributor(@Args('createDistributorInput') args: CreateDistributorInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.distributorsService.create(args)
  }

  @Query(() => [Distributor], { name: 'distributors' })
  findAll(@Args() args: FindManyDistributorArgs) {
    return this.distributorsService.findAll(args)
  }

  @Query(() => Distributor, { name: 'distributor' })
  findOne(@Args() args: FindUniqueDistributorArgs) {
    return this.distributorsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Distributor)
  async updateDistributor(@Args('updateDistributorInput') args: UpdateDistributorInput, @GetUser() user: GetUserType) {
    const distributor = await this.prisma.distributor.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, distributor.uid)
    return this.distributorsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Distributor)
  async removeDistributor(@Args() args: FindUniqueDistributorArgs, @GetUser() user: GetUserType) {
    const distributor = await this.prisma.distributor.findUnique(args)
    checkRowLevelPermission(user, distributor.uid)
    return this.distributorsService.remove(args)
  }
}
