import Borrowing from "../models/borrowings.model.js";
import Book from "../models/books.model.js";
import Member from "../models/members.model.js";

// borrow book
export async function borrowBook(req, res) {
    let member = await Member.findAll({where: {member_id: req.body.member_id}});
    let book = await Book.findAll({where: {book_id: req.body.book_id}});
    let borrowing;

    try {
        if (member && book.no_of_copies > 0) {
            req.body.returned = false;
            borrowing = await Borrowing.create(req.body);
            // decrement number of copies of a book
        }

        if (borrowing) {
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowing
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Borrowing book failed"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oops! Something went wrong."
        });
    }
}

// return book
export async function returnBook(req, res) {
    let book = await Book.findAll({where: {book_id: req.body.book_id}});
    let member = await Member.findAll({where: {member_id: req.body.member_id}});
    // increment number of book copies
    try {
        if (member && book) {
            req.body.returned = true;
            console.log(req.body);
            res.send(req.body);
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to return book"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

// view all borrowed books
export async function viewAllBorrowedBooks(req, res) {
    try {
        let allBorrowedBooks = await Borrowing.findAll({where: {returned: true}});
        if (allBorrowedBooks.length > 0) {
            res.status(200).json({
                success: true,
                message: "Borrowed books retrieved successfully!",
                data: allBorrowedBooks
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Did not find any borrowed books."
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oops! Something went wrong."
        });
    }
}

// view all borrowings
export async function viewAllBorrowings(req, res) {
    try {
        let allBorrowings = await Borrowing.findAll();
        if (allBorrowings) {
            res.status(200).json({
                success: true,
                message: "Borrowings retrieved successfully",
                data: allBorrowings
            });
        } else {
            res.status(500).json({
                success: false,
                message: "No borrowings found.",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oops! Something went wrong."
        })
    }
}

// view all borrowings by a member
export async function viewAllBorrowingsByMember(req, res) {
    try {
        let allMemberBorrowings = await Borrowing.findAll({where: {member_id: req.params.member_id}});
        if (allMemberBorrowings) {
            res.status(200).json({
                success: true,
                message: "Member borrowings retrieved successfully",
                data: allMemberBorrowings
            });
        } else {
            res.status(500).json({
                success: false,
                message: "No Member borrowings found.",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oops! Something went wrong."
        })
    }
}