import "reflect-metadata"
import { inject, injectable } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string,
}

@injectable()
export default class DeleteBookService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({user_id}: IRequest): Promise<void> {
    await this.usersRepository.deleteById(user_id);

    return;
  }
}
