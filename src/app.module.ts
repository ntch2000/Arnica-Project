import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepoModule } from './repo/repo.module';
import { GitleaksModule } from './gitleaks/gitleaks.module';



@Module({
  imports: [RepoModule, GitleaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
