import Book from '../infra/typeorm/entities/Book';

import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default interface IBooksrepository {
  create(data: ICreateBookDTO): Promise<Book>;
  save(book: Book): Promise<Book>;
  index(): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>
  find(book: string): Promise<Book | undefined>
  deleteById(id: string): Promise<void>
}
