import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { DistributorsService } from './distributors.service'
import { Distributor } from './entity/distributor.entity'
import {
  FindManyDistributorArgs,
  FindUniqueDistributorArgs,
} from './dtos/find.args'
import { CreateDistributorInput } from './dtos/create-distributor.input'
import { UpdateDistributorInput } from './dtos/update-distributor.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { User } from 'src/models/users/graphql/entity/user.entity'
import { Warehouse } from 'src/models/warehouses/graphql/entity/warehouse.entity'

@Resolver(() => Distributor)
export class DistributorsResolver {
  constructor(
    private readonly distributorsService: DistributorsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Distributor)
  createDistributor(
    @Args('createDistributorInput') args: CreateDistributorInput,
    @GetUser() user: GetUserType,
  ) {
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
  async updateDistributor(
    @Args('updateDistributorInput') args: UpdateDistributorInput,
    @GetUser() user: GetUserType,
  ) {
    const distributor = await this.prisma.distributor.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, distributor.uid)
    return this.distributorsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Distributor)
  async removeDistributor(
    @Args() args: FindUniqueDistributorArgs,
    @GetUser() user: GetUserType,
  ) {
    const distributor = await this.prisma.distributor.findUnique(args)
    checkRowLevelPermission(user, distributor.uid)
    return this.distributorsService.remove(args)
  }

  @ResolveField(() => User)
  user(@Parent() distributor: Distributor) {
    return this.prisma.user.findUnique({
      where: { uid: distributor.uid },
    })
  }

  @ResolveField(() => [Warehouse])
  warehouses(@Parent() distributor: Distributor) {
    return this.prisma.warehouse.findMany({
      where: { distributorId: distributor.uid },
    })
  }
}
