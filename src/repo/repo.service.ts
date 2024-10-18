import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';

@Injectable()
export class RepoService {
    constructor(private readonly httpService: HttpService){}

    private readonly gitAPIUrl = 'https://api.github.com/repos' //url for the github api
    private repository = [
        {
            "name": 'repo1',
            "description": "test data repo description",
            "defaultBranch": "main",
            "lastCommit": "today"
        },
        {
            "name": 'repo2',
            "description": "test data repo description for two",
            "defaultBranch": "main",
            "lastCommit": "1300"
        },
        {
            "name": 'repo3',
            "description": "test data repo description  for 3",
            "defaultBranch": "main",
            "lastCommit": "yesterday"
        }
    ]

    fetchRepoInfo(url: string){
        const repository = this.repository.find(repository => repository.name === url)
        return repository
    }


}
