import { Injectable } from "@nestjs/common";
import { GithubService } from "./github.service";
import { RepoService } from "./repo.service.interface";

@Injectable()
export class RepoSelectorService {
    constructor(
        private readonly GitHubService: GithubService,
    ) {}

    getRepoService(url: string): RepoService {
        if (url.includes(`github.com`)) {
            return this.GitHubService
        }
        throw new Error(`SCM not yet implemented`)
    }
    
    
    }


