import { Router } from "express";
import { tokenAuth } from "../middlewares/token.middleware";
import { ChatController } from "../controllers";

const router: Router = Router();

router.post("/", tokenAuth, ChatController.chatCompletion);

export default router;