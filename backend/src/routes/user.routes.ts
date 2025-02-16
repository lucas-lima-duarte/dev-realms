import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/:id', userController.findById.bind(userController));
router.get('/characters', authMiddleware, userController.getUserCharacters.bind(userController));

export default router;