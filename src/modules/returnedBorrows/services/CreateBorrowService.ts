import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import ReturnedBorrow from "../infra/typeorm/entities/ReturnedBorrow";
import IBorrowsRepository from "../repositories/IReturnedBorrowsRepository";
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

  public async execute({book, user}: IRequest): Promise<void> {}
}

export default CreateBorrowService;
