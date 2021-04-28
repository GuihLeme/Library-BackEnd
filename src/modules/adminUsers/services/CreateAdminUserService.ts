import { getRepository } from 'typeorm';
import { hash } from  'bcryptjs';

import AdminUser from '../infra/typeorm/entities/AdminUser'
import AppError from '../../../shared/errors/AppError';



interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateAdminUsersService {
  public async execute({ name, email, password }: Request): Promise<AdminUser> {
    const adminUsersRepository = getRepository(AdminUser);

    const checkUserExists = await adminUsersRepository.findOne({
      where: { email }
    })

    if(checkUserExists) {
      throw new AppError('Email address already used', 400)
    }

    const hashedPassword = await hash(password, 8)

    const adminUser = adminUsersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await adminUsersRepository.save(adminUser);

    return adminUser;
  }
}

export default CreateAdminUsersService;
