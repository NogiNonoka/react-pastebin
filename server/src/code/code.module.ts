import { Module } from '@nestjs/common'
// import { MongooseModule } from '@nestjs/mongoose'
// import { CodeSchema } from './code.scheme'
import { CodeService } from './code.service'
import { CodeController } from './code.controller'

@Module({
    imports: [
        // MongooseModule.forFeature([
        //     { name: 'data', schema: CodeSchema }
        // ])
    ],
    providers: [CodeService],
    controllers: [CodeController],
})
export class CodeModule { }
