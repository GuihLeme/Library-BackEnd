import { container } from 'tsyringe';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IBooksRepository from '../../modules/books/repositories/IBooksRepository';
import BooksRepository from '../../modules/books/infra/typeorm/repositories/BooksRepository';

import IBorrowsRepository from '../../modules/borrows/repositories/IBorrowsRepository';
import BorrowsRepository from '../../modules/borrows/infra/typeorm/repositories/BorrowsRepository';

import IReturnedBorrowsRepository from '../../modules/returnedBorrows/repositories/IReturnedBorrowsRepository';
import ReturnedBorrowsRepository from '../../modules/returnedBorrows/infra/typeorm/repositories/ReturnedBorrowsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<IBorrowsRepository>(
  'BorrowsRepository',
  BorrowsRepository,
);

container.registerSingleton<IReturnedBorrowsRepository>(
  'ReturnedBorrowsRepository',
  ReturnedBorrowsRepository,
);

