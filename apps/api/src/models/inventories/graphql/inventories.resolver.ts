import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InventoriesService } from './inventories.service'
import { Inventory } from './entity/inventory.entity'
import { FindManyInventoryArgs, FindUniqueInventoryArgs } from './dtos/find.args'
import { CreateInventoryInput } from './dtos/create-inventory.input'
import { UpdateInventoryInput } from './dtos/update-inventory.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Inventory)
export class InventoriesResolver {
  constructor(private readonly inventoriesService: InventoriesService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Inventory)
  createInventory(@Args('createInventoryInput') args: CreateInventoryInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.inventoriesService.create(args)
  }

  @Query(() => [Inventory], { name: 'inventories' })
  findAll(@Args() args: FindManyInventoryArgs) {
    return this.inventoriesService.findAll(args)
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args() args: FindUniqueInventoryArgs) {
    return this.inventoriesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Inventory)
  async updateInventory(@Args('updateInventoryInput') args: UpdateInventoryInput, @GetUser() user: GetUserType) {
    const inventory = await this.prisma.inventory.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, inventory.uid)
    return this.inventoriesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Inventory)
  async removeInventory(@Args() args: FindUniqueInventoryArgs, @GetUser() user: GetUserType) {
    const inventory = await this.prisma.inventory.findUnique(args)
    checkRowLevelPermission(user, inventory.uid)
    return this.inventoriesService.remove(args)
  }
}
