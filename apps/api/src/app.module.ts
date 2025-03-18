import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './common/prisma/prisma.module'
import { UsersModule } from './models/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { MAX_AGE } from '@foundation/util'
import { ItemsModule } from './models/items/items.module'
import { ManufacturersModule } from './models/manufacturers/manufacturers.module'
import { DistributorsModule } from './models/distributors/distributors.module'
import { RetailersModule } from './models/retailers/retailers.module'
import { ProductsModule } from './models/products/products.module'
import { WarehousesModule } from './models/warehouses/warehouses.module'
import { LocationsModule } from './models/locations/locations.module'
import { TransactionsModule } from './models/transactions/transactions.module'
import { InventoriesModule } from './models/inventories/inventories.module'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      fieldResolverEnhancers: ['guards'],
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    ItemsModule,
    ManufacturersModule,
    DistributorsModule,
    RetailersModule,
    ProductsModule,
    WarehousesModule,
    LocationsModule,
    TransactionsModule,
    InventoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
