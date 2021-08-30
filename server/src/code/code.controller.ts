import { Controller, Get, Body, Post } from '@nestjs/common';
import { Code } from './code.interface';
import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
    constructor(
        private readonly codeService: CodeService
    ) {}

    // @Get('find')
    // async find(@Body() body: any) {
    //     return await this.codeService.find(body.id);
    // }

    // @Get('all')
    // async findAll() {
    //     return await this.codeService.findAll();
    // }
    
    @Post('write')
    async write(@Body() body: any) {
        return await this.codeService.writeCache(body);
    }

    @Post('read')
    async read(@Body() body: any) {
        return await this.codeService.readCache(body.id);
    }
}
