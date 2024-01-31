import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './docs/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //get variable from .env using config service
  const configService = app.get(ConfigService);

  const port          = configService.get<number>('PORT') ?? 8888;

  const apiPrefix     = configService.get<string>('API_PREFIX');
  
  const document = SwaggerModule.createDocument(app , swaggerConfig);
  SwaggerModule.setup(apiPrefix,app,document);

  await app.listen(port);
}
bootstrap();
