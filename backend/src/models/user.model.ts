import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { BaseModel } from './base.model';
import { CharacterClass } from './character-class.model';

export class User extends BaseModel {
    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    public username: string;

    @prop({ ref: () => CharacterClass })
    public selectedClass?: Ref<CharacterClass>;

    @prop({ default: 0 })
    public eloRating: number;

    @prop({ default: 1 })
    public level: number;

    @prop({ default: 0 })
    public experience: number;
}

export const UserModel = getModelForClass(User);