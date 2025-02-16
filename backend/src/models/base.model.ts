import { prop } from '@typegoose/typegoose';

export interface BaseModel {
    id: string | number;
}

export abstract class BaseModel {
    @prop({ required: true })
    public createdAt: Date;

    @prop({ required: true })
    public updatedAt: Date;

    @prop({ required: true, default: false })
    public deleted: boolean;
}
