import { Router } from 'express';

import BorrowsController from '../controllers/BorrowsController';

const borrowsRouter = Router();
const borrowsController = new BorrowsController()

borrowsRouter.post('/create', borrowsController.create)

borrowsRouter.get('/index', borrowsController.index)

borrowsRouter.post('/:borrow_id/renew', borrowsController.update_renew)

borrowsRouter.post('/:borrow_id/returned', borrowsController.update_return)

borrowsRouter.get('/return_this_week', borrowsController.index_return_this_week)


export default borrowsRouter;

