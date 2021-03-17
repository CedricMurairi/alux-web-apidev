import express from "express";
import membersRouter from "./membersRouter.js";
import borrowingsRouter from "./borrowingsRouter.js";

const router = express.Router();


router.use("/members", membersRouter);
router.use("/borrow", borrowingsRouter);


export default router;