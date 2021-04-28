import "reflect-metadata";

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookService from '../../../services/CreateBookService';
import ListBooksService from '../../../services/ListBooksService';
import ListAvailableBooksService from '../../../services/ListAvailableBooksService';
import ShowBookService from '../../../services/ShowBookService';
import UpdateBookService from '../../../services/UpdateBookService';
import DeleteBookService from '../../../services/DeleteBookService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, author, publisher, cover } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({name, author, publisher, cover});

    return response.json(book)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params

    const showBook = container.resolve(ShowBookService)

    const book = await showBook.execute({book_id})

    return response.json(book);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listBooks = container.resolve(ListBooksService)

    const books = await listBooks.execute()

    return response.json(books);
  }

  public async index_available_books(request: Request, response: Response): Promise<Response> {
    const listBooks = container.resolve(ListAvailableBooksService)

    const books = await listBooks.execute()

    return response.json(books);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params
    const { name, author, publisher, cover } = request.body

    const updateUser = container.resolve(UpdateBookService)

    const updatedUser = await updateUser.execute({ book_id, name, author, publisher, cover })

    return response.json(updatedUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params

    const deleteBook = container.resolve(DeleteBookService)

    await deleteBook.execute({ book_id })

    return response.json('sucesso');
  }
}
