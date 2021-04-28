import { getRepository } from 'typeorm';
import { compare } from  'bcryptjs';
import { sign } from 'jsonwebtoken';

import AdminUser from '../infra/typeorm/entities/AdminUser'
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  adminUser: AdminUser;
  token: string;
}

class AuthenticateAdminUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const adminUsersRepository = getRepository(AdminUser);

    const adminUser = await adminUsersRepository.findOne({
      where: { email }
    })

    if (!adminUser) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, adminUser.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: adminUser.id,
      expiresIn,
    })

    return  {
      adminUser,
      token
    }
  }
}

export default AuthenticateAdminUserService;
