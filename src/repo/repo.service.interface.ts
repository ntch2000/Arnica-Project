import { Observable } from "rxjs"

// interface used for all SCM services
export interface RepoService {
    parseUrl(url: string): { owner: string, repoName: string }
    fetchRepoInfo(url: string) : Observable<any>
}