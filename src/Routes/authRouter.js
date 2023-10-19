import { Router } from "express";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../Schemas/auth.schemas.js";
import { postSignIn, postSignUp, signOut } from "../Controllers/auth.controllers.js";
import { authValidate } from "../Middlewares/authValidate.js";

const signRouter = Router();

signRouter.post('/sign-up', validateSchema(signUpSchema), postSignUp);
signRouter.post('/sign-in'  , validateSchema(signInSchema), postSignIn);
signRouter.delete('/sign-out'  , authValidate, signOut);

export default signRouter;