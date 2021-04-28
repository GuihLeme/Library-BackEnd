import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string,
  email: string,
  phone: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({name, email, phone}: IRequest): Promise<User> {
    const checkUsersExistsByEmail = await this.usersRepository.findByEmail(email);

    if(checkUsersExistsByEmail) {
      throw new Error('email já cadastrado')
    }

    const checkUsersExistsByPhone = await this.usersRepository.findByPhone(phone);

    if(checkUsersExistsByPhone) {
      throw new Error('telefone já cadastrado')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      phone
    })

    return user;
  }
}

export default CreateUserService;
