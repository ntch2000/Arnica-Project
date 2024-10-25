import { Controller, Get, Query } from '@nestjs/common';
import { RepoSelectorService } from './repo-selector.service';
import { Observable } from 'rxjs';


@Controller('repo')
export class RepoController {

    constructor(private readonly repoSelectorService: RepoSelectorService){}
/*
    routes that we need

    GET /repo/:url -> this route will take the url of the git repo

*/

@Get()
fetchRepoInfo(@Query('url') url: string): Observable<any>{
    
    const repoService = this.repoSelectorService.getRepoService(url)
    return repoService.fetchRepoInfo(url)
}

}
