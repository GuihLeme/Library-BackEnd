import "reflect-metadata"
import { injectable, inject } from "tsyringe";

import Borrow from "../infra/typeorm/entities/Borrow";
import IBorrowsRepository from "../repositories/IBorrowsRepository";
import IBooksRepository from "../../books/repositories/IBooksRepository";

interface IRequest {
  borrow_id: string,
}

@injectable()
export default class ReturnedBookService {
  constructor(
    @inject('BorrowsRepository')
    private borrowsRepository: IBorrowsRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({borrow_id }: IRequest): Promise<Borrow> {
    const borrow = await this.borrowsRepository.findById(borrow_id);

    if(!borrow) {
      throw new Error('Borrow not found!')
    }

    const selectedBook = await this.booksRepository.find(borrow.book);

    if(!selectedBook) {
      throw new Error('Livro não encontrado')
    }

    borrow.is_active = false;
    selectedBook.available = true;

    await this.borrowsRepository.save(borrow)
    await this.booksRepository.save(selectedBook)

    return borrow;
  }
}
