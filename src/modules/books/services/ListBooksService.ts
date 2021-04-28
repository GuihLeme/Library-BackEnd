import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Book from "../infra/typeorm/entities/Book";
import IBooksRepository from "../repositories/IBooksRepository";

@injectable()
class ListBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute(): Promise<Book[]> {
    const BooksList = await this.booksRepository.index()

    return BooksList
  }
}

export default ListBooksService;
