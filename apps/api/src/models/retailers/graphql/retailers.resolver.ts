import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { RetailersService } from './retailers.service'
import { Retailer } from './entity/retailer.entity'
import { FindManyRetailerArgs, FindUniqueRetailerArgs } from './dtos/find.args'
import { CreateRetailerInput } from './dtos/create-retailer.input'
import { UpdateRetailerInput } from './dtos/update-retailer.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { User } from 'src/models/users/graphql/entity/user.entity'
import { Warehouse } from 'src/models/warehouses/graphql/entity/warehouse.entity'

@Resolver(() => Retailer)
export class RetailersResolver {
  constructor(
    private readonly retailersService: RetailersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Retailer)
  createRetailer(
    @Args('createRetailerInput') args: CreateRetailerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.retailersService.create(args)
  }

  @Query(() => [Retailer], { name: 'retailers' })
  findAll(@Args() args: FindManyRetailerArgs) {
    return this.retailersService.findAll(args)
  }

  @Query(() => Retailer, { name: 'retailer' })
  findOne(@Args() args: FindUniqueRetailerArgs) {
    return this.retailersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Retailer)
  async updateRetailer(
    @Args('updateRetailerInput') args: UpdateRetailerInput,
    @GetUser() user: GetUserType,
  ) {
    const retailer = await this.prisma.retailer.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, retailer.uid)
    return this.retailersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Retailer)
  async removeRetailer(
    @Args() args: FindUniqueRetailerArgs,
    @GetUser() user: GetUserType,
  ) {
    const retailer = await this.prisma.retailer.findUnique(args)
    checkRowLevelPermission(user, retailer.uid)
    return this.retailersService.remove(args)
  }

  @ResolveField(() => User)
  user(@Parent() retailer: Retailer) {
    return this.prisma.user.findUnique({
      where: { uid: retailer.uid },
    })
  }

  @ResolveField(() => [Warehouse])
  async warehouses(@Parent() retailer: Retailer) {
    const warehouses = await this.prisma.warehouse.findMany({
      where: { retailerId: retailer.uid },
    })
    return warehouses
  }
}
