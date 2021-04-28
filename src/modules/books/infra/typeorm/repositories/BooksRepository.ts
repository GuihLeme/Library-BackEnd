import {EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuidv4} from 'uuid'

import ICreateBookDTO from '../../../dtos/ICreateBookDTO';
import IBooksRepository from '../../../repositories/IBooksRepository';
import Book from '../entities/Book';

@EntityRepository(Book)
export default class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book)
  }

  public async create({ name, author, publisher, cover }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      id: uuidv4(),
      name,
      author,
      publisher,
      cover,
      available: true,
    });

    await this.ormRepository.save(book);

    return book;
  }

  public async save(book: Book): Promise<Book> {
    return this.ormRepository.save(book)
  }

  public async index(): Promise<Book[]> {
    const books = await this.ormRepository.find()

    return books;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne({
      where: { id }
    })

    return book;
  }

  public async find(book: string): Promise<Book | undefined> {
    const selectedBook = await this.ormRepository.findOne(book)

    return selectedBook;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
