import "reflect-metadata";

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import ShowUserService from '../../../services/ShowUserService';
import ListUsersService from '../../../services/ListUsersService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      phone,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const showUser = container.resolve(ShowUserService)

    const user = await showUser.execute({user_id})


    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService)

    const users = await listUsers.execute()

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params
    const { name, email, phone } = request.body

    const updateUser = container.resolve(UpdateUserService)

    const updatedUser = await updateUser.execute({ user_id, name, email, phone })

    return response.json(updatedUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const deleteUser = container.resolve(DeleteUserService)

    await deleteUser.execute({ user_id })

    return response.json();

  }
}
