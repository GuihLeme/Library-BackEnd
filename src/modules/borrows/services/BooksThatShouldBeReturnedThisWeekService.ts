import "reflect-metadata"
import {injectable, inject} from 'tsyringe';
import { isSameWeek, parseISO } from 'date-fns'

import Borrow from "../infra/typeorm/entities/Borrow";
import IBorrowsRepository from "../repositories/IBorrowsRepository";

@injectable()
class BooksThatShouldBeReturnedThisWeekService {
  constructor(
    @inject('BorrowsRepository')
    private borrowsRepository: IBorrowsRepository,
  ) {}

  public async execute(): Promise<Borrow[]> {
    const activeBorrows = await this.borrowsRepository.listAllBorrowsActivesFromNow()

    function isThisBorrowShouldBeReturnedThisWeek(borrow: Borrow) {
      return isSameWeek(parseISO(borrow.return_at), new Date()) === true;
    }


    const filteredBorrows = activeBorrows.filter(isThisBorrowShouldBeReturnedThisWeek)


    return filteredBorrows
  }
}

export default BooksThatShouldBeReturnedThisWeekService;
