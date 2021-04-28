import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  cover: string;

  @Column()
  available: boolean;
}

export default Book;
