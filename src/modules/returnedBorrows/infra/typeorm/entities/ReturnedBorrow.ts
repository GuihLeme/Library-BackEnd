import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import Book from '../../../../books/infra/typeorm/entities/Book';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('returnedBorrows')
class Borrow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id'})
  book: string;

  @Column('date')
  borrow_at: Date;

  @Column('date')
  return_at: Date;
}

export default Borrow;
