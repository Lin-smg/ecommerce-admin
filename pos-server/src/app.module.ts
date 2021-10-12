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
            type: "postgres",
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
    MainCategoryModule
  ],
exports: [TypeOrmModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(contextMiddleware).forRoutes('*');
  }
}
