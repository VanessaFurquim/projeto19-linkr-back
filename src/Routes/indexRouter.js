import { Router } from "express";
import signRouter from "./authRouter.js";
import publishesRouter from "./publishesRouter.js";

const router = Router();

router.use(signRouter);
router.use(publishesRouter);

export default router;