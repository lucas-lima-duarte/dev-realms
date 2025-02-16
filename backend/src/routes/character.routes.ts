import { Router } from "express";
import { CharacterController } from "../controllers/character.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()
const charController = new CharacterController();


router.get('/', authMiddleware, charController.find.bind(charController));

export default router;