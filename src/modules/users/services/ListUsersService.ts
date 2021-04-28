import "reflect-metadata"
import {injectable, inject} from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class ListUsersServie {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[]> {
    const UsersList = await this.usersRepository.index()

    return UsersList;
  }
}

export default ListUsersServie;
