import { DocumentType } from '@typegoose/typegoose';
import { User, UserModel } from '../models/user.model';
import { BaseService } from './base.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Ref } from '@typegoose/typegoose';
import { CharacterClass } from '../models/character-class.model';

export class UserService extends BaseService<User> {
    constructor() {
        super(UserModel);
    }

    async register(userData: {
        email: string;
        password: string;
        username: string;
    }): Promise<DocumentType<User>> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await this.create({
            ...userData,
            password: hashedPassword,
        });
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await UserModel.findOne({ email, deleted: false });
        if (!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return null;

        return jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
    }

    async selectClass(userId: string, classId: string): Promise<DocumentType<User> | null> {
        return await this.update(userId, { selectedClass: classId as unknown as Ref<CharacterClass> });
    }
}