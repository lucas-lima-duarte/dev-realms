import { prop } from '@typegoose/typegoose';

export interface BaseModel {
    id: string | number;
}

export abstract class BaseModel {
    @prop({ required: true, default: Date.now() })
    public createdAt: Date;

    @prop({})
    public updatedAt: Date;

    @prop({ required: true, default: false })
    public deleted: boolean;
}
