import "reflect-metadata"
import { injectable, inject } from "tsyringe";

import Borrow from "../infra/typeorm/entities/ReturnedBorrow";
import IBorrowsRepository from "../repositories/IReturnedBorrowsRepository";

interface IRequest {
  borrow_id: string,
}

@injectable()
export default class RenewBorrowReturnAtService {
  constructor(
    @inject('BorrowsRepository')
    private borrowsRepository: IBorrowsRepository
  ) {}

  public async execute({borrow_id }: IRequest): Promise<Borrow> {
    const borrow = await this.borrowsRepository.findById(borrow_id);

    if(!borrow) {
      throw new Error('Borrow not found!')
    }

    const date = new Date();
    date.setDate(date.getDate() + 15);

    borrow.return_at = date;

    await this.borrowsRepository.save(borrow)

    return borrow;
  }
}
