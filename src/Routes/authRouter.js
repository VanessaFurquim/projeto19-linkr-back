import { Router } from "express";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { signUp, signIn } from "../Controllers/auth.controllers.js";
import { signUpSchema, signInSchema } from "../Schemas/auth.schemas.js";
const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter