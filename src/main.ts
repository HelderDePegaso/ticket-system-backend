import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Acesse o ConfigService para pegar todas as variáveis
   const configService = app.get(ConfigService);

   // Logando todas as variáveis de ambiente
   console.log('Variáveis de Ambiente:');
   const envVars = configService.get('DB_NAME'); // Pega todas as variáveis
   /*console.log(process.env); */ // Exibe as variáveis carregadas

   app.useGlobalPipes(new ValidationPipe());
   
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
