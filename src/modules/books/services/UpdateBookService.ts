import "reflect-metadata"
import { inject, injectable } from "tsyringe";

import Book from "../infra/typeorm/entities/Book";
import IBooksRepository from "../repositories/IBooksRepository";

interface IRequest {
  book_id: string,
  name: string,
  author: string,
  publisher: string,
  cover: string,
}

@injectable()
export default class UpdateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute({book_id, name, author, publisher, cover}: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(book_id);

    if(!book) {
      throw new Error('Book not found!')
    }

    book.name = name;
    book.author = author;
    book.publisher = publisher;
    book.cover = cover;

    this.booksRepository.save(book)

    return book;
  }
}
