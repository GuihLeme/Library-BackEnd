import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Book from "../infra/typeorm/entities/Book";
import IBooksRepository from "../repositories/IBooksRepository";

interface IRequest {
  name: string,
  author: string,
  publisher: string,
  cover: string,
}

@injectable()
class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute({name, author, publisher, cover}: IRequest): Promise<Book> {
    const book = await this.booksRepository.create({
      name,
      author,
      publisher,
      cover,
    })

    return book;
  }
}

export default CreateBookService;
