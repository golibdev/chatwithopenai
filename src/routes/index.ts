import { Router } from "express";
import userRoute from "./user.route";
import chatRoute from "./chat.route";

const router: Router = Router();

router.use('/user', userRoute);
router.use('/chats', chatRoute);

export default router;