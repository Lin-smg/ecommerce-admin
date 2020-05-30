import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { contextMiddleware } from './common/middlewares';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [   
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule,SharedModule],
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
   
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(contextMiddleware).forRoutes('*');
  }
}
