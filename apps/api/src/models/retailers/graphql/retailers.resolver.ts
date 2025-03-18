import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RetailersService } from './retailers.service'
import { Retailer } from './entity/retailer.entity'
import { FindManyRetailerArgs, FindUniqueRetailerArgs } from './dtos/find.args'
import { CreateRetailerInput } from './dtos/create-retailer.input'
import { UpdateRetailerInput } from './dtos/update-retailer.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Retailer)
export class RetailersResolver {
  constructor(private readonly retailersService: RetailersService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Retailer)
  createRetailer(@Args('createRetailerInput') args: CreateRetailerInput, @GetUser() user: GetUserType) {
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
  async updateRetailer(@Args('updateRetailerInput') args: UpdateRetailerInput, @GetUser() user: GetUserType) {
    const retailer = await this.prisma.retailer.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, retailer.uid)
    return this.retailersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Retailer)
  async removeRetailer(@Args() args: FindUniqueRetailerArgs, @GetUser() user: GetUserType) {
    const retailer = await this.prisma.retailer.findUnique(args)
    checkRowLevelPermission(user, retailer.uid)
    return this.retailersService.remove(args)
  }
}
