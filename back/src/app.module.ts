import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConnectionModule } from "./db/connection.module";
import { AppModules } from "./app/app.module";
import { SeedModule } from "./seeds/Seed.module";
import { SeedService } from "./seeds/seeds.service";

@Module({
  imports: [
    AppModules,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: [".env"],
      isGlobal: true,
    }),
    ConnectionModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedRoles(); // Executa o seed
  }
}
