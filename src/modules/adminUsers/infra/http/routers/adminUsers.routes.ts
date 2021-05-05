import { Router } from 'express';

import CreateAdminUserService from '../../../services/CreateAdminUserService';

const adminUsersRouter = Router();

adminUsersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createAdminUser = new CreateAdminUserService();

  const adminUser = await createAdminUser.execute({
    name,
    email,
    password
  })

  const adminUserWithoutPassword = {
    id: adminUser.id,
    name: adminUser.name,
    email: adminUser.email,
    created_at: adminUser.created_at,
    updated_at: adminUser.updated_at,
  }

  return response.json(adminUserWithoutPassword);
})

export default adminUsersRouter;

