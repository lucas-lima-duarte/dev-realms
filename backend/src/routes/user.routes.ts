import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/:id', userController.findById.bind(userController));
router.get('/:id/characters', userController.getUserCharacters.bind(userController));

export default router;