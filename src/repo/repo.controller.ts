import { Controller, Get, Param, Query } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Observable } from 'rxjs';

@Controller('repo')
export class RepoController {

    constructor(private readonly repoService: RepoService){}
/*
    routes that we need

    GET /repo/:url -> this route will take the url of the git repo

*/

@Get()
fetchRepoInfo(@Query('url') url: string) {
    
    //return this.repoService.fetchRepoInfo('https://github.com/ntch2000/neilgandhi-portfolio')
    return this.repoService.fetchRepoInfo(url)
}

}
