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
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("Api", app, document);

  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET, HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
