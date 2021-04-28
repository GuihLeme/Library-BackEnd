import { Router } from 'express';

import BooksController from '../controllers/BooksController';

const booksRouter = Router();
const booksController = new BooksController()

booksRouter.post('/create', booksController.create)

booksRouter.get('/index', booksController.index)

booksRouter.get('/available/index', booksController.index_available_books)

booksRouter.get('/:book_id', booksController.show)

booksRouter.put('/:book_id', booksController.update)

booksRouter.delete('/:book_id', booksController.delete)

export default booksRouter;

