import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseModel } from './base.model';

export class CharacterClass extends BaseModel {
    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public description: string;

    @prop({ type: () => [String], default: [] })
    public skillTrees: string[];

    @prop({ required: true })
    public difficulty: string;
}

export const CharacterClassModel = getModelForClass(CharacterClass);