import { HttpService } from '@nestjs/axios';
import { Injectable, Options } from '@nestjs/common';
import { response } from 'express';
import { basename } from 'path';
import { map, Observable, switchMap } from 'rxjs';

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
    const gitUrl = `https://api.github.com/repos/${owner}/${repoName}`; //sets url for the github api call
    

    const basicRepoInfo = this.httpService.get(gitUrl).pipe(map(response => response.data)) // api call to obtain the basic repo info

   
    // obtains the commit information from the data obtained from the previous api call
    return basicRepoInfo.pipe(
        switchMap(repoData => {
            const commitURL = `https://api.github.com/repos/${owner}/${repoName}/commits/${repoData.default_branch}`;
            return this.httpService.get(commitURL).pipe(
                map(commitURLResponse => {
                    const commitInfo = commitURLResponse.data;

                    // returning the final object with the basic repository information and last commit date on the default branch
                    return {
                        name: repoData.name,
                        description: repoData.description,
                        defaultBranch: repoData.default_branch,
                        lastCommitDate: commitInfo.commit.author.date
                    }
                })
            )
        })

        
    ) 
    

  
  }}
