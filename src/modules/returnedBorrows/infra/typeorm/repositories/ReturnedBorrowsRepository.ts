import { EntityRepository, getRepository, Repository } from 'typeorm';

import IReturnedBorrowsRepository from '../../../repositories/IReturnedBorrowsRepository';
import ReturnedBorrow from '../entities/ReturnedBorrow';

@EntityRepository(ReturnedBorrow)
export default class ReturnedBorrowsRepository implements IReturnedBorrowsRepository {
  private ormRepository: Repository<ReturnedBorrow>;

  constructor() {
    this.ormRepository = getRepository(ReturnedBorrow)
  }

  public async create(returnedBorrow: ReturnedBorrow): Promise<void> {
    const borrow = this.ormRepository.create(returnedBorrow);

    await this.ormRepository.save(borrow)
  }

  public async save(borrow: ReturnedBorrow): Promise<void> {}
}

