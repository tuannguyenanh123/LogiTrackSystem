import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ManufacturersService } from './manufacturers.service'
import { Manufacturer } from './entity/manufacturer.entity'
import {
  FindManyManufacturerArgs,
  FindUniqueManufacturerArgs,
} from './dtos/find.args'
import { CreateManufacturerInput } from './dtos/create-manufacturer.input'
import { UpdateManufacturerInput } from './dtos/update-manufacturer.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { User } from 'src/models/users/graphql/entity/user.entity'
import { Product } from 'src/models/products/graphql/entity/product.entity'
import { Warehouse } from 'src/models/warehouses/graphql/entity/warehouse.entity'

@Resolver(() => Manufacturer)
export class ManufacturersResolver {
  constructor(
    private readonly manufacturersService: ManufacturersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  createManufacturer(
    @Args('createManufacturerInput') args: CreateManufacturerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.manufacturersService.create(args)
  }

  @Query(() => [Manufacturer], { name: 'manufacturers' })
  findAll(@Args() args: FindManyManufacturerArgs) {
    return this.manufacturersService.findAll(args)
  }

  @Query(() => Manufacturer, { name: 'manufacturer' })
  findOne(@Args() args: FindUniqueManufacturerArgs) {
    return this.manufacturersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  async updateManufacturer(
    @Args('updateManufacturerInput') args: UpdateManufacturerInput,
    @GetUser() user: GetUserType,
  ) {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, manufacturer.uid)
    return this.manufacturersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  async removeManufacturer(
    @Args() args: FindUniqueManufacturerArgs,
    @GetUser() user: GetUserType,
  ) {
    const manufacturer = await this.prisma.manufacturer.findUnique(args)
    checkRowLevelPermission(user, manufacturer.uid)
    return this.manufacturersService.remove(args)
  }

  @ResolveField(() => User)
  user(@Parent() manufacturer: Manufacturer) {
    return this.prisma.user.findUnique({
      where: { uid: manufacturer.uid },
    })
  }

  @ResolveField(() => [Product])
  products(@Parent() parent: Manufacturer) {
    return this.prisma.product.findMany({
      where: { manufacturerUid: parent.uid },
    })
  }

  @ResolveField(() => [Warehouse])
  warehouses(@Parent() parent: Manufacturer) {
    return this.prisma.warehouse.findMany({
      where: { manufacturerId: parent.uid },
    })
  }
}
