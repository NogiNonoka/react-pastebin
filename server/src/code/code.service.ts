import { Injectable, HttpStatus } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { redis } from '../redis'
import { Code } from './code.interface';

@Injectable()
export class CodeService {
    constructor() {}

    async checkID(id: string) {
        const exist = await redis.exists(id);
        if (exist === 1) {
            return { statusCode: HttpStatus.FORBIDDEN };
        }
        return { statusCode: HttpStatus.OK }
    }

    async writeCache(data: Code) {
        const exist = await redis.exists(data.id);
        if (exist === 1) {
            return { message: 'Invalid ID', statusCode: HttpStatus.FORBIDDEN };
        }
        await redis.hset(data.id, "title", data.title);
        await redis.hset(data.id, "expiraAt", data.expiraAt);
        await redis.hset(data.id, "language", data.language);
        await redis.hset(data.id, "code", data.code);
        await redis.expire(data.id, data.expiration)
        return { message: 'Success', statusCode: HttpStatus.OK }
    }

    async readCache(id: string) {
        const exist = await redis.exists(id);
        if (exist === 0) {
            return { message: 'Data Not Found', statusCode: HttpStatus.NOT_FOUND };
        }
        const promise = new Promise((resolve) => {
            redis.hgetall(id, (err: any, res: string) => {
                resolve({ statusCode: HttpStatus.OK, data: res });
            })
        });
        return await promise;
    }
}
