import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { VersioningType } from '@nestjs/common';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '100mb' }));
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://dashboard-frontend-two.vercel.app',
    ],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DASHBOARD API')
    .setDescription('Endpoints for DASHBOARD')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT) || 8000);
}
bootstrap();
