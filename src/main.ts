import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import { ValidationErrorFilter } from './filters/db-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    {
      origin: "http://localhost:4200",
      credentials: true
    }
  )
  app.use(cookieParser());
  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Threads App")
    .setDescription("Threads messaging app")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
