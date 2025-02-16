import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { BaseModel } from './base.model';

import { User } from './user.model';

enum Classes {
    Novice = 'Novice',
    Backend = 'Backend',
    Frontend = 'Frontend',
    Infrastructure = 'Infrastructure'
}

export class Character extends BaseModel {
    @prop({ ref: () => User, required: true })
    public user: Ref<User>;

    @prop({ default: 0, enum: Classes })
    public class: string;

    @prop({ default: 0 })
    public eloRating: number;

    @prop({ default: 1 })
    public level: number;

    @prop({ default: 0 })
    public experience: number;

    @prop({ type: () => [String], default: [] })
    public skillTrees: string[];

    @prop({ required: true })
    public difficulty: string;
}

export const CharacterModel = getModelForClass(Character); 