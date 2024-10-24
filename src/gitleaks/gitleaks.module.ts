import { Module } from '@nestjs/common';
import { GitleaksService } from './gitleaks.service';
import { GitleaksController } from './gitleaks.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GitleaksService],
  controllers: [GitleaksController]
})
export class GitleaksModule {}
