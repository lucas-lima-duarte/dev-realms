import { BaseService } from './base.service';
import { Character, CharacterModel } from '../models/character.model';

export class CharacterService extends BaseService<Character> {
    constructor() {
        super(CharacterModel);
    }
}