import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { logInterceptor } from './interceptos/log.inteceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    })
  );
  app.enableShutdownHooks();

  // app.useGlobalInterceptors( new logInterceptor() )

  await app.listen(3000);
}
bootstrap();
