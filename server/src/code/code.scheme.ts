import { Schema } from 'mongoose';

export const CodeSchema = new Schema({
    _id: String,
    title: String,
    expiration: Number,
    language: String,
    code: String,
}, { collection: "data" });