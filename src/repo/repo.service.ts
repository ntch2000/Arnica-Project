import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RepoService {
  constructor(private readonly httpService: HttpService) {}

  //private readonly gitAPIUrl = 'https://api.github.com/repos'; //url for the github api

  // https://{owner}.github.io/{reponame}
  // will need to extract owner and name from url via regex

  private parseUrl(gitUrl: string): {owner: string, repoName: string}{
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = gitUrl.match(regex);

    // checks to see if the url matches git format and extracts the owner (match group 1) and the repo (match group 2)
    if (match && match[1] && match[2]) {
        return {owner: match[1], repoName: match[2]};
    }

    throw new Error('Not a git URL')
  }


  fetchRepoInfo(url): Observable<any> {
    const {owner, repoName} = this.parseUrl(url); 
    const gitUrl = `https://api.github.com/repos/${owner}/${repoName}`;
    
    // 'https://api.github.io/ntch2000/arnica-project'
    return this.httpService
    .get(gitUrl)
    .pipe(
        map((response) => response.data),
    map((data) => ({
        name: data.name,
        description: data.description,
        default_branch: data.default_branch,

    })));
  }
}
