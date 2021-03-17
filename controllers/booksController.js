import Book from "../models/books.model.js";


//Add a Book
export async function addBook(req, res) {
    try {
        let book = await Book.create(req.body);
        if (book) {
            res.status(200).json({
                success: true,
                message: 'Book created successfully',
                data: book
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Book could not be created, bad request'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a Book
export async function viewBook(req, res) {
    try {
        let book = await Book.findOne({where: {book_id: req.params.id}});
        if (book) {
            res.status(200).json({
                success: true,
                message: 'Book retrieved successfully',
                data: book
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Book not found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View all Books
export async function viewAllBooks(req, res) {
    try {
        let allBooks = await Book.findAll();
        if (allBooks) {
            res.status(200).json({
                success: true,
                message: 'Book records retrieved successfully',
                data: allBooks
            })
        } else {
            res.status(404).json({
                success: true,
                message: 'No Book records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Update Book record
export async function updateBook(req, res) {
    try{
        const book = await Book.findOne({where: {book_id: req.params.id}});
        if (book){
            if (req.body.title && req.body.title !== book.title){book.title = req.body.title;}
            if (req.body.author && req.body.author !== book.author){book.author = req.body.author;}
            if (req.body.publish_date && req.body.publish_date !== book.publish_date){book.publish_date = req.body.publish_date;}
            if (req.body.isbn && req.body.isbn !== book.isbn){book.isbn = req.body.isbn;}
            if (req.body.no_of_copies && req.body.no_of_copies !== book.no_of_copies){book.no_of_copies = req.body.no_of_copies;}
            if (req.body.genre && req.body.genre !== book.genre){book.genre = req.body.genre;}
            
            await book.save();
            await book.reload();

            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: book
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Book not found',
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        }) 
    }
}

//Delete a Book
export async function deleteBook(req, res) {
    try{
        const book = await Book.findOne({where: {book_id: req.params.id}})
        if (book){
            await book.destroy();

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: book
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'There is something wrong with the server'
        })
    }
}