import { Router } from 'express';

import UsersController from '../controllers/UsersController'

const usersRouter = Router();
const usersController = new UsersController()

usersRouter.post('/create', usersController.create) //

usersRouter.get('/index', usersController.index) //

usersRouter.get('/:user_id', usersController.show) //

usersRouter.put('/:user_id', usersController.update)

usersRouter.delete('/:user_id/delete', usersController.delete)

export default usersRouter;

