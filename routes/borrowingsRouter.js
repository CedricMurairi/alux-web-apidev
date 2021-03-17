import express from "express";
import {borrowBook, returnBook, viewAllBorrowedBooks, viewAllBorrowingsByMember} from "../controllers/borrowingsController.js";

const borrowingsRouter = express.Router();

// Borrow book
borrowingsRouter.post("/", borrowBook);

// Return book
borrowingsRouter.put("/", returnBook);

// View all borrowed books
borrowingsRouter.get("/books", viewAllBorrowedBooks);

// View all borrowings by a member
borrowingsRouter.get("/members/:member_id", viewAllBorrowingsByMember);

export default borrowingsRouter;