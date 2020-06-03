import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/exceptions/all-exception-filter';


async function bootstrap() {
  // AppModule
  const app = await NestFactory.create(AppModule);
  // Config
  const configService = app.get(ConfigService);
  // Logs

  //Validation
  app.useGlobalPipes(new ValidationPipe());
  //Interceptor
  //app.useGlobalInterceptors(new TransformInterceptor());
  //Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter);
  // Cors
  if (configService.get('MODE') === 'development') {
    app.enableCors();
  }

  // Server Port
  const port = process.env.PORT || configService.get('PORT');
  
  // Swagger
  if (configService.get('MODE') === 'development') {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('POS')
      .setDescription('POS API')
      .setVersion('1.0')
      .addBearerAuth()
      .build());
    SwaggerModule.setup('api', app, document);

  }

  await app.listen(port);

}
bootstrap();
