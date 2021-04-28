import Borrow from '../infra/typeorm/entities/Borrow';

import ICreateBorrowDTO from '../dtos/ICreateBorrowDTO';

export default interface IBorrowsRepository {
  create(data: ICreateBorrowDTO): Promise<Borrow>;
  save(borrow: Borrow): Promise<Borrow>;
  listAllBorrowsActivesFromNow(): Promise<Borrow[]>;
  deactiveAllBorrowsAlreadyExpired(): Promise<Borrow[]>;
  findById(id: string): Promise<Borrow | undefined>
}
