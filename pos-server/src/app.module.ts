import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { contextMiddleware } from './common/middlewares';
import { PermissionModule } from './permission/permission.module';
import { CompanyModule } from './company/company.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UnitsModule } from './units/units.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoryModule } from './category/category.module';
import { BranchModule } from './branch/branch.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrandModule } from './brand/brand.module';
import { ProductsModule } from './products/products.module';
import { PosModule } from './pos/pos.module';
import { ProductModule } from './client/product/product.module';
import { ClientOrderModule } from './client/order/order.module';
import { ClientCategoryModule } from './client/category/category.module';
import { MainCategoryModule } from './main-category/main-category.module';
import { OrderModule } from './order/order.module';
import { PurchaseProductModule } from './purchase-product/purchase-product.module';

@Module({
  imports: [   
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule, 
          SharedModule,
          MulterModule.register({
          dest: './files',
        })],
        useFactory: (configService: ConfigService) => (
          {
            // url: "postgres://lzyhbljifnbsnb:a1b86fe044c5b3ac77182e8a39615bf28897cd4cf89bda9d5ee5f37cce069c64@ec2-3-213-41-172.compute-1.amazonaws.com:5432/d7rp0hpj3a8so4",
            // url: "postgres://pvmzfdtohfizee:a80a72b4c21fe0738fd464b9c9937705445b306a4153b9aa75753e9b3b66e831@ec2-3-230-199-240.compute-1.amazonaws.com:5432/d1ped2kkn7bkf6",
            type: "postgres",
            // extra: {
            //   ssl: {
            //     rejectUnauthorized: false
            //   }
            // },
            host: configService.get<string>('POSTGRES_HOST'),
            port: configService.get<number>('POSTGRES_PORT'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DATABASE'),

            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: configService.get<boolean>('SYNCHRONIZE'),

          }),
        inject: [ConfigService]
      }
    ),
    UsersModule,
    AuthModule,
    PermissionModule,
    CategoryModule,
    CompanyModule,
    WarehouseModule,
    UnitsModule,
    CustomersModule,
    SuppliersModule,
    BranchModule,
    DashboardModule,
    BrandModule,
    ProductsModule,
    PosModule,
    ProductModule,
    ClientOrderModule,
    OrderModule,
    ClientCategoryModule,
    MainCategoryModule,
    PurchaseProductModule
  ],
exports: [TypeOrmModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(contextMiddleware).forRoutes('*');
  }
}
