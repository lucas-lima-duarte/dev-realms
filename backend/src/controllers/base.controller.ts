import { Request, Response } from 'express';
import { BaseService } from '../services/base.service';
import { BaseModel } from '../models/base.model';

export abstract class BaseController<T extends BaseModel> {
    protected service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const entity = await this.service.create(req.body);
            res.status(201).json(entity);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const entity = await this.service.findById(req.params.id);
            if (!entity) {
                res.status(404).json({ error: 'Entity not found' });
                return;
            }
            res.json(entity);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}