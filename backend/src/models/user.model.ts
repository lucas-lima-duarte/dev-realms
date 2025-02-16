import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { BaseModel } from './base.model';

export class User extends BaseModel {
    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    public username: string;

}

export const UserModel = getModelForClass(User);