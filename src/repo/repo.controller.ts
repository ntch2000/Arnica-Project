import { Controller, Get, Param, Query } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller('repo')
export class RepoController {

    constructor(private readonly repoService: RepoService){}
/*
    routes that we need

    GET /repo/:url -> this route will take the url of the git repo

*/

@Get()
fetchRepoInfo( ) {

    return this.repoService.fetchRepoInfo()

}

}
