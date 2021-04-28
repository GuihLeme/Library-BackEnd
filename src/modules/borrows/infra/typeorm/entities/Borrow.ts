import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Book from '../../../../books/infra/typeorm/entities/Book';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('borrows')
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

  @Column('boolean')
  renewed: boolean;

  @Column('boolean')
  is_active: boolean;
}

export default Borrow;
