import { Controller, Get, Param } from '@nestjs/common';

@Controller('repo')
export class RepoController {
/*
    routes that we need

    GET /repo/:url -> this route will take the url of the git repo

*/

@Get(':url')
fetchRepoInfo(@Param('url') url: string) {
    return {name: url, description: 'description', defaultBranch: 'default branch', lastCommit: 'last commit'
    }

}

}
