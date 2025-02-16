import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';

export class UserController extends BaseController<User> {
    private readonly userService: UserService;

    constructor() {
        const userService = new UserService();
        super(userService);
        this.userService = userService;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const token = await this.userService.login(email, password);
            if (!token) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async selectClass(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { classId } = req.body;
            const user = await this.userService.selectClass(userId, classId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
