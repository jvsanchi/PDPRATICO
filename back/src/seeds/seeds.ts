// seed.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { SeedService } from "./seeds.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  await seedService.seedRoles(); // Executa o seed
  await app.close(); // Fecha a aplicação após executar o seed
}

bootstrap();
