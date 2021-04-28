import "reflect-metadata"
import { inject, injectable } from "tsyringe";

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string,
  name: string,
  email: string,
  phone: string,
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({user_id, name, email, phone}: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new Error('User not found!')
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.updated_at = new Date();

    await this.usersRepository.save(user)

    return user;
  }
}
