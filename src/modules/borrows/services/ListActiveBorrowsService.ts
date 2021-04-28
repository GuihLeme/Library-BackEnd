import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import Borrow from "../infra/typeorm/entities/Borrow";
import IBorrowsRepository from "../repositories/IBorrowsRepository";

@injectable()
class ListActiveBorrowsService {
  constructor(
    @inject('BorrowsRepository')
    private borrowsRepository: IBorrowsRepository
  ) {}

  public async execute(): Promise<Borrow[]> {
    await this.borrowsRepository.deactiveAllBorrowsAlreadyExpired()

    const activeBorrows = await this.borrowsRepository.listAllBorrowsActivesFromNow()

    function ascendingOrder(a: Borrow, b: Borrow) {
      return new Date(a.return_at) - new Date(b.return_at)
    }

    activeBorrows.sort(ascendingOrder)

    return activeBorrows;
  }
}

export default ListActiveBorrowsService;
