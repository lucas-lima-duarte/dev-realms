import { BaseService } from './base.service';
import { DocumentType } from '@typegoose/typegoose';
import { User, UserModel } from '../models/user.model';
import { CharacterModel } from '../models/character.model';
import { Classes } from '../types/enum/classes.enum';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        const user = await this.create({
            ...userData,
            password: hashedPassword
        });

        // Create all chars
        await Promise.all(Object.values(Classes).map(characterClass =>
            CharacterModel.create({
                user: user._id,
                class: characterClass,
                difficulty: 'Easy',
                eloRating: 0,
                level: 1,
                experience: 0,
                skillTrees: []
            })
        ));

        return user;
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
}