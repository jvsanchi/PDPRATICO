import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConnectionModule } from "./db/connection.module";
import { AppModules } from "./app/app.module";

@Module({
  imports: [
    AppModules,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: [".env"],
      isGlobal: true,
    }),
    ConnectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
