import express from "express";
import { addBook, viewAllBooks, viewBook, updateBook, deleteBook } from '../controllers/booksController.js'

const booksRouter = express.Router();

//Add a book
booksRouter.post("/", addBook);

//View a book books/:id
booksRouter.get("/:id", viewBook);

//View all books books/
booksRouter.get("/", viewAllBooks);

//Update book record books/
booksRouter.put("/:id", updateBook);

//Delete a book books/:id
booksRouter.delete("/:id", deleteBook);

export default booksRouter;