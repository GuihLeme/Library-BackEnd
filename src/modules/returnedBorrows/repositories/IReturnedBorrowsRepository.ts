import Borrow from '../infra/typeorm/entities/ReturnedBorrow';

import ICreateBorrowDTO from '../dtos/ICreateBorrowDTO';

export default interface IReturnedBorrowsRepository {
  create(data: ICreateBorrowDTO): Promise<void>;
  save(borrow: Borrow): Promise<void>;
}
