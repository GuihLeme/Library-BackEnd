import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Borrow from "../infra/typeorm/entities/Borrow";
import IBorrowsRepository from "../repositories/IBorrowsRepository";
import IBooksRepository from "../../books/repositories/IBooksRepository";

interface IRequest {
  book: string,
  user: string,
}

@injectable()
class CreateBorrowService {
  constructor(
    @inject('BorrowsRepository')
    private borrowsRepository: IBorrowsRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({book, user}: IRequest): Promise<Borrow> {
    const borrow = await this.borrowsRepository.create({
      book,
      user,
    })

    const borrowedBook = await this.booksRepository.findById(book)

    if(!borrowedBook) {
      throw new Error('Livro não encontrado')
    }

    borrowedBook.available = false;

    this.booksRepository.save(borrowedBook)

    return borrow;
  }
}

export default CreateBorrowService;
