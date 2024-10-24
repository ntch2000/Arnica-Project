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

    async scanRepo(/* gitUrl: string */): Promise<string> {
        //const {owner, repoName } = this.parseUrl(gitUrl);
        const owner = 'ntch2000'
        const repoName = `weather-dashboard`
        //const gitArchive = `https://github.com/${owner}/${repoName}`
        const gitUrl = `https://github.com/${owner}/${repoName}`
        const cloneDir = path.join(__dirname, repoName)

        try {
            await this.cloneRepo(gitUrl, cloneDir);

            const scanResults = await this.gitleaksScan(cloneDir);

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

    private async deleteRepo(cloneDir: string): Promise<void> {
        await fs.promises.rm(cloneDir, { recursive: true, force: true})
    }

    private async gitleaksScan(cloneDir: string): Promise<string> {

        try {
            const { stdout, stderr } = await execAsync(`gitleaks detect ${cloneDir} -v -r report.json`)
            if (stderr) {
                throw new Error(`Gitleaks scan failed: ${stderr}`)
            }
            return stdout
        }
        catch (error) {
            const exitCode = error.code;
            if (exitCode === 1) {
                return error.stdout || 'test'
            }
            if (exitCode !== 0) {
                throw new Error(`Gitleaks failed with exit code ${exitCode}: ${error.message}`)
            }
            return error.stdout || 'test2'
        }
        
       
    }


}
