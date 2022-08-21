import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config, ENVS } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO: custom cors base on ENV
  app.enableCors({ origin: '*' });
  if (config.NODE_ENV !== ENVS.PROD) {
    const builder = new DocumentBuilder()
      .setTitle('Kanban Board API')
      .setDescription('Kanban Board API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, builder);
    SwaggerModule.setup('pXGLdUP6oZP7Xu6gH6Lxun2u3pfbVG', app, document);

    app.useStaticAssets('public');
  }
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
