import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { HttpModule } from '@nestjs/axios'; // used to make axios calls

@Module({
    imports: [HttpModule],
    controllers: [RepoController],
    providers: [RepoService]
})
export class RepoModule {}
