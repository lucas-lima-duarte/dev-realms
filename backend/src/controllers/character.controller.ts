import { BaseController } from './base.controller';
import { Character } from '../models/character.model';
import { CharacterService } from '../services/chacacter.service';

export class CharacterController extends BaseController<Character> {

    constructor() {
        const userService = new CharacterService();
        super(userService);
    }

}
