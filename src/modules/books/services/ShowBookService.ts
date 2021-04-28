import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Book from "../infra/typeorm/entities/Book";
import IBooksRepository from "../repositories/IBooksRepository";

interface IRequest {
  book_id: string,
}

@injectable()
class ShowBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute({book_id}: IRequest): Promise<Book> {
    const checkUserExists = await this.booksRepository.findById(book_id)

    if(!checkUserExists) {
      throw new Error('Livro não encontrado')
    }

    return checkUserExists;
  }
}

export default ShowBookService;
