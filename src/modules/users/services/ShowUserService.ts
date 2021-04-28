import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string,
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({user_id}: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(user_id)
    console.log(user_id)

    if(!checkUserExists) {
      throw new Error('Usuário não encontrado')
    }

    return checkUserExists;
  }
}

export default ShowUserService;
