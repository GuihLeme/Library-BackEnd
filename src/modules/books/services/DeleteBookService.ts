import "reflect-metadata"
import { inject, injectable } from "tsyringe";

import IBooksRepository from "../repositories/IBooksRepository";

interface IRequest {
  book_id: string,
}

@injectable()
export default class DeleteBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) {}

  public async execute({book_id}: IRequest): Promise<void> {
    await this.booksRepository.deleteById(book_id);

    return;
  }
}
