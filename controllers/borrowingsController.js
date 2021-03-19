import Borrowing from "../models/borrowings.model.js";
import Book from "../models/books.model.js";
import Member from "../models/members.model.js";

// borrow book
export async function borrowBook(req, res) {
    let member = await Member.findOne({where: {member_id: req.body.member_id}});
    let book = await Book.findOne({where: {book_id: req.body.book_id}});
    let borrowing;

    try {
        if (member && book.no_of_copies > 0) {
            req.body.returned = false;
            borrowing = await Borrowing.create(req.body);
            // decrement number of copies of a book
            book.no_of_copies -= 1;
            book.save();
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
                message: "Cannot borrow this book now"
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
    let borrowing = await Borrowing.findOne({where: {member_id: req.body.member_id, book_id: req.body.book_id, returned: false}});
    let book = await Book.findOne({where: {book_id: req.body.book_id}});
    let member = await Member.findOne({where: {member_id: req.body.member_id}});

    try {
        if (borrowing && book && member) {
            borrowing.returned = true;
            book.no_of_copies += 1;

            book.save();
            borrowing.save();
            res.status(200).json({
                success:true,
                message: "Book returned succesffully",
                data: borrowing
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to return book"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something terrible happened"
        })
    }
}

// view all borrowed books
export async function viewAllBorrowedBooks(req, res) {
    try {
        let allBorrowedBooks = await Borrowing.findAll({where: {returned: false}});
        if (allBorrowedBooks.length > 0) {
            res.status(200).json({
                success: true,
                message: "Borrowed books retrieved successfully!",
                data: allBorrowedBooks
            });
        } else {
            res.status(404).json({
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

// View a borrowing
export async function viewBorrowing(req, res){
    try{
        let borrowing = await Borrowing.findOne({where: {borrowing_id: req.params.borrowing_id}});
        if (borrowing){
            res.status(200).json({
                success: true,
                message: "Borrowing retrieved successfully",
                data: borrowing
            })
        }else{
            res.status(404).json({
                success: false,
                message: "Borrowing not found"
            })
        }
    }catch (err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// view all borrowings
export async function viewAllBorrowings(req, res) {
    try {
        let allBorrowings = await Borrowing.findAll();
        if (allBorrowings.length > 0) {
            res.status(200).json({
                success: true,
                message: "Borrowings retrieved successfully",
                data: allBorrowings
            });
        } else {
            res.status(404).json({
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
        if (allMemberBorrowings.length > 0) {
            res.status(200).json({
                success: true,
                message: "Member borrowings retrieved successfully",
                data: allMemberBorrowings
            });
        } else {
            res.status(404).json({
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