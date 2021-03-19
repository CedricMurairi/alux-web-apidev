import express from "express";
import {borrowBook, returnBook, viewAllBorrowedBooks, viewBorrowing, viewAllBorrowings, viewAllBorrowingsByMember} from "../controllers/borrowingsController.js";

const borrowingsRouter = express.Router();

// Borrow book
borrowingsRouter.post("/", borrowBook);

// Return book
borrowingsRouter.put("/", returnBook);

// View all borrowed books
borrowingsRouter.get("/active", viewAllBorrowedBooks);

// View a borrowing entry
borrowingsRouter.get("/:borrowing_id", viewBorrowing);

// View all borrowing records
borrowingsRouter.get("/", viewAllBorrowings);

// View all borrowings by a member
borrowingsRouter.get("/members/:member_id", viewAllBorrowingsByMember);

export default borrowingsRouter;