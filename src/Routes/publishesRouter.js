import { Router } from "express";
import { publishSchema } from "../Schemas/newPublish.js";
import { getPublishes, newPublish } from "../Controllers/publishesControllers.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { authValidate } from "../Middlewares/authValidate.js";

const publishesRouter = Router();

publishesRouter.post('/publish', authValidate, validateSchema(publishSchema), newPublish);
publishesRouter.get('/publish', authValidate, getPublishes)

export default publishesRouter;