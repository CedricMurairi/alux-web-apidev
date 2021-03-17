import express from "express";
import booksRouter from "./booksRouter.js";
import membersRouter from "./membersRouter.js"

const router = express.Router();


router.use("/members", membersRouter);
router.use("/books", booksRouter)


export default router;