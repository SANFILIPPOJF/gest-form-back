import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './errors/http-exception.filter';
import { corsConfig } from './constants/cors-config';

async function bootstrap() {
  const port = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
    .useGlobalPipes(new ValidationPipe())
    .useGlobalFilters(new HttpExceptionFilter())
    .enableCors(corsConfig);

  const config = new DocumentBuilder()
    .setTitle('Gest Form')
    .setDescription('Api de gestion des formations')
    .setVersion('1.0')
    .addTag('GestForm')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log('Server started at http://localhost:' + port);
}

bootstrap();
