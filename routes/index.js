import express from "express";
import membersRouter from "./membersRouter.js";
import borrowingsRouter from "./borrowingsRouter.js";
import booksRouter from "./booksRouter.js";

const router = express.Router();

router.use("/members", membersRouter);
router.use("/borrow", borrowingsRouter);
router.use("/books", booksRouter)

export default router;