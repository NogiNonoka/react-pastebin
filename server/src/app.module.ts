import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CodeModule } from './code/code.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pastebin'),
    CodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
