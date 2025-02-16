import { DocumentType } from '@typegoose/typegoose';
import { BaseModel } from '../models/base.model';

export abstract class BaseService<T extends BaseModel> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<DocumentType<T>> {
        const now = new Date();
        const entity = new this.model({
            ...data,
            createdAt: now,
            updatedAt: now,
        });
        return await entity.save();
    }

    async findById(id: string): Promise<DocumentType<T> | null> {
        return await this.model.findOne({ _id: id, deleted: false });
    }

    async find(userId: string): Promise<DocumentType<T> | null> {
        return await this.model.find({ user: userId, deleted: false });
    }

    async update(id: string, data: Partial<T>): Promise<DocumentType<T> | null> {
        return await this.model.findOneAndUpdate(
            { _id: id, deleted: false },
            { ...data, updatedAt: new Date() },
            { new: true }
        );
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true, updatedAt: new Date() }
        );
        return !!result;
    }
}
