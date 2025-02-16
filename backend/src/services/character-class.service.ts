import { CharacterClass, CharacterClassModel } from '../models/character-class.model';
import { BaseService } from './base.service';

export class CharacterClassService extends BaseService<CharacterClass> {
    constructor() {
        super(CharacterClassModel);
    }

    async findByName(name: string): Promise<CharacterClass | null> {
        return await CharacterClassModel.findOne({ name, deleted: false });
    }
}