import { getRepository, Repository } from 'typeorm';
import { v4 as uuidv4} from 'uuid'

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({ name, email, phone }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      id: uuidv4(),
      name,
      email,
      phone,
      created_at: new Date(),
      updated_at: new Date(),
    })

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async index(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { id },
    })

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    })

    return user;
  }

  public async findByPhone(phone: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { phone },
    })

    return user;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default UsersRepository;
