import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PlayerModule } from "./player/player.module";
import { HeroModule } from "./hero/hero.module";
import { TowerModule } from "./tower/tower.module";
import { CombatModule } from "./combat/combat.module";
import { GachaModule } from "./gacha/gacha.module";

@Module({
  imports: [AuthModule, PlayerModule, HeroModule, TowerModule, CombatModule, GachaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
