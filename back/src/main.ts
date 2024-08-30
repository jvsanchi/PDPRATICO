import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("P-De-Pratico")
    .setDescription("P-De-Pratico")
    .setVersion("1.0")
    .addTag("P-De-Pratico")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("Api", app, document);

  await app.listen(3000);
}
bootstrap();