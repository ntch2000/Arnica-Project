import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process'
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { stdout } from 'process';

const execAsync = promisify(exec)

@Injectable()
export class GitleaksService {
    constructor(private readonly httpService: HttpService) {}

    // function to parse the git url for the owner and repo name
    private parseUrl(gitUrl: string): {owner: string, repoName: string}{
        const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = gitUrl.match(regex);
    
        // checks to see if the url matches git format and extracts the owner (match group 1) and the repo (match group 2)
        if (match && match[1] && match[2]) {
            return {owner: match[1], repoName: match[2]};
        }
    
        throw new Error('Not a git URL')
      }

      // function to scan the repo
      /*
      Function to do the vulnerability/security scan on the repo
      1. Repo will be cloned to a temporary directory
      2. Gitleaks scan will be run and the output will be written to a json file
      3. Temporary directory is deleted
      */
    async scanRepo(gitUrl: string): Promise<string> {
      
        const { repoName } = this.parseUrl(gitUrl)
        
        
        const cloneDir = path.join(__dirname, repoName)

        try {
            // clones the target repo
            await this.cloneRepo(gitUrl, cloneDir);

            // runs gitleaks on the repo
            const scanResults = await this.gitleaksScan(cloneDir, repoName);

            // repo is deleted
            await this.deleteRepo(cloneDir)

            return `Scan completed: ${scanResults}`;
        } catch (error) {
            return `error: ${error.message}`
        }
    }

    // clones the target repo to temp directory
    private async cloneRepo(gitUrl: string, cloneDir: string): Promise<void> {

        await execAsync(`git clone ${gitUrl} ${cloneDir}`)
    }

    // delete the temp directory
    private async deleteRepo(cloneDir: string): Promise<void> {
        await fs.promises.rm(cloneDir, { recursive: true, force: true})
    }

    // performs the gitleaks scan
    // exit code 1 needs to be handled as that will kill the function before it finishes
    private async gitleaksScan(cloneDir: string, repoName): Promise<string> {

        try {
            const { stdout, stderr } = await execAsync(`gitleaks git ${cloneDir} -v --report-path ${repoName}-report.json`)
            if (stderr) {
                throw new Error(`Gitleaks scan failed: ${stderr}`)
            }
            return stdout
        }
        catch (error) { // checks to see if the exit code is 1, which means leaks were found
            const exitCode = error.code;
            if (exitCode === 1) {
                return error.stdout || 'Leaks found'
            }
            if (exitCode !== 0) {
                throw new Error(`Gitleaks failed with exit code ${exitCode}: ${error.message}`)
            }
            return error.stdout || 'No leaks found'
        }
        
       
    }


}
