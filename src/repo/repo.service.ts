import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class RepoService {
  constructor(private readonly httpService: HttpService) {}

  private readonly gitAPIUrl = 'https://api.github.com/repos'; //url for the github api

  // https://{owner}.github.io/{reponame}
  // will need to extract owner and name from url

  private repository = [
    {
      name: 'repo1',
      description: 'test data repo description',
      defaultBranch: 'main',
      lastCommit: 'today',
    },
    {
      name: 'repo2',
      description: 'test data repo description for two',
      defaultBranch: 'main',
      lastCommit: '1300',
    },
    {
      name: 'repo3',
      description: 'test data repo description  for 3',
      defaultBranch: 'main',
      lastCommit: 'yesterday',
    },
  ];

  fetchRepoInfo() {
    const url = 'https://api.github.com/repos/ntch2000/neilgandhi-portfolio';
    console.log(url);
    // 'https://api.github.io/ntch2000/arnica-project'
    return this.httpService
    .get(url)
    .pipe(
        map((response) => response.data),
    map((data) => ({
        name: data.name,
        description: data.description,
        default_branch: data.default_branch,

    })));
  }
}
