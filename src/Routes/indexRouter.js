import { Router } from "express";
import signRouter from "./authRouter.js";

const router = Router();

router.use(signRouter);

export default router;