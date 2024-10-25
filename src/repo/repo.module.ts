import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoSelectorService } from './repo-selector.service';
import { GithubService } from './github.service';
import { HttpModule } from '@nestjs/axios'; // used to make axios calls

@Module({
    imports: [HttpModule],
    controllers: [RepoController],
    providers: [RepoSelectorService, GithubService]
})
export class RepoModule {}
