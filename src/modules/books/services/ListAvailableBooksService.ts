import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Book from "../infra/typeorm/entities/Book";
import IBooksRepository from "../repositories/IBooksRepository";

@injectable()
class ListAvailableBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute(): Promise<Book[]> {
    const booksList = await this.booksRepository.index()

    function isAvailable(book: Book) {
      return book.available === true;
    }

    const availableBooks = booksList.filter(isAvailable);


    return availableBooks
  }
}

export default ListAvailableBooksService;
