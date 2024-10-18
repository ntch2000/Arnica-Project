import { Controller, Get, Param } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller('repo')
export class RepoController {

    constructor(private readonly repoService: RepoService){}
/*
    routes that we need

    GET /repo/:url -> this route will take the url of the git repo

*/

@Get(':url')
fetchRepoInfo(@Param('url') url: string) {
    return this.repoService.fetchRepoInfo(url)

}

}
