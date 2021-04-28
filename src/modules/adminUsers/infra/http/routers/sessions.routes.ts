import { Router } from 'express';

import AuthenticateAdminUserService from '../../../services/AuthenticateAdminUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateAdminUser = new AuthenticateAdminUserService()

  const { adminUser, token } = await authenticateAdminUser.execute({
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


  return response.json({ adminUserWithoutPassword, token })
})


export default sessionsRouter;

