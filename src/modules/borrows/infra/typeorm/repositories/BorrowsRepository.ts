import { endOfDay, isMonday, isSaturday, isSunday, nextTuesday, parseISO } from 'date-fns';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuidv4} from 'uuid';

import ICreateBorrowDTO from '../../../dtos/ICreateBorrowDTO';
import IBorrowrepository from '../../../repositories/IBorrowsRepository';
import Borrow from '../entities/Borrow';

@EntityRepository(Borrow)
export default class BorrowsRepository implements IBorrowrepository {
  private ormRepository: Repository<Borrow>;

  constructor() {
    this.ormRepository = getRepository(Borrow)
  }

  public async create({user, book}: ICreateBorrowDTO): Promise<Borrow> {
    let date = new Date();
    date.setDate(date.getUTCDate() + 17);

    date = endOfDay(date);

    if(isSaturday(date) || isSunday(date) || isMonday(date)) {
      const dateSetToNextTuesday = nextTuesday(date)

      const borrow = this.ormRepository.create({
        id: uuidv4(),
        borrow_at: new Date(),
        return_at: dateSetToNextTuesday,
        renewed: false,
        is_active: true,
        user,
        book,
      })

      await this.ormRepository.save(borrow);

      return borrow
    }

    const borrow = this.ormRepository.create({
      id: uuidv4(),
      borrow_at: new Date(),
      return_at: date,
      renewed: false,
      is_active: true,
      user,
      book,
    })

    await this.ormRepository.save(borrow);

    return borrow;
  }

  public async save(borrow: Borrow): Promise<Borrow> {
    return this.ormRepository.save(borrow)
  }

  public async listAllBorrowsActivesFromNow(): Promise<Borrow[]> {
    const activeBorrows = await this.ormRepository.find({
      where: {
        is_active: true,
      },
      relations: ['user', 'book']
    });

    return activeBorrows;
  }

  public async deactiveAllBorrowsAlreadyExpired(): Promise<Borrow[]> {
    const borrowsRespository = await this.ormRepository.find();

    function isBeforeToday(borrow : { return_at: Date}) {
      return endOfDay(parseISO(borrow.return_at)) < new Date() //ParseISO obrigatório não sei por quê, já que o return_at está typado como Date
    }

    const expiredBorrows = borrowsRespository.filter(isBeforeToday);

    // borrowsRespository.map(async (borrow) => {
    //   if(endOfDay(parseISO(borrow.return_at)) < new Date()) {
    //     borrow.is_active = false;

    //     await this.ormRepository.save(borrow)
    //   } else {
    //     await this.ormRepository.save(borrow)
    //   }
    // })

    borrowsRespository.map((borrow) => {
      expiredBorrows.map(async (expiredBorrow) => {
        if(borrow.id === expiredBorrow.id) {
          borrow.is_active = false;

          await this.ormRepository.save(borrow);
        }
      })
    })





    return borrowsRespository;
  }

  public async findById(id: string): Promise<Borrow | undefined> {
    const borrow = await this.ormRepository.findOne({
      where: { id },
      relations: ['book']
    })

    return borrow;
  }
}

