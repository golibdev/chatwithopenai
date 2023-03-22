import { CustomRequest } from './../utils/interface';
import { Router, Request, Response } from "express";
import { UserController } from "../controllers";
import { body } from 'express-validator';
import { tokenAuth } from "../middlewares/token.middleware";
import { validate } from "../utils/validator";

const router: Router = Router();

router.post(
   "/signup",
   body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 6 }).withMessage("username must have at least 6 characters")
      .isLength({ max: 15 }).withMessage("username must have a maximum 15 characters"),
   body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password must have at least 8 characters"),
   validate,
   UserController.userRegister
)

router.post(
   "/signin",
   body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 6 }).withMessage("username must have at least 6 characters"),
   body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password must have at least 8 characters"),
   validate,
   UserController.userSignIn
)

router.get(
   "/check-token",
   tokenAuth,
   (req: Request, res: Response) => res.status(200).json({
      username: (req as CustomRequest).user.username
   })
)

export default router;