import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { LocationsService } from './locations.service'
import { Location } from './entity/location.entity'
import { FindManyLocationArgs, FindUniqueLocationArgs } from './dtos/find.args'
import { CreateLocationInput } from './dtos/create-location.input'
import { UpdateLocationInput } from './dtos/update-location.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Location)
  createLocation(@Args('createLocationInput') args: CreateLocationInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.locationsService.create(args)
  }

  @Query(() => [Location], { name: 'locations' })
  findAll(@Args() args: FindManyLocationArgs) {
    return this.locationsService.findAll(args)
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args() args: FindUniqueLocationArgs) {
    return this.locationsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Location)
  async updateLocation(@Args('updateLocationInput') args: UpdateLocationInput, @GetUser() user: GetUserType) {
    const location = await this.prisma.location.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, location.uid)
    return this.locationsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Location)
  async removeLocation(@Args() args: FindUniqueLocationArgs, @GetUser() user: GetUserType) {
    const location = await this.prisma.location.findUnique(args)
    checkRowLevelPermission(user, location.uid)
    return this.locationsService.remove(args)
  }
}
