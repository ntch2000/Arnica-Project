import { Controller, Get, Query } from '@nestjs/common';
import { GitleaksService } from './gitleaks.service';

@Controller('gitleaks')
export class GitleaksController {
    constructor(private readonly gitLeaksService: GitleaksService) {}

    @Get('scan')
    async scanRepo(){
        return await this.gitLeaksService.scanRepo()
        
        
    }
}
