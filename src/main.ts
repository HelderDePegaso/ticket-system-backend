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

   app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Ignora todos os campos a mais (no  body/dto ) que não esteja registado no dto (eliminando-os)
    forbidNonWhitelisted: true // Reclama se haver campos    a mais (no  body/dto ) que não esteja registado no dto
   }));

   // Enable CORS for all routes 
   app.enableCors({
     origin: '*',
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
     allowedHeaders: 'Content-Type, Accept, Authorization',
     credentials: true
   })
   
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
