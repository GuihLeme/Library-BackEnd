import { Router } from 'express';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import booksRouter from '../../../../modules/books/infra/http/routes/books.routes';
import borrowsRouter from '../../../../modules/borrows/infra/http/routes/borrows.routes';
import adminRouter from '../../../../modules/adminUsers/infra/http/routers/adminUsers.routes';
import sessionsRouter from '../../../../modules/adminUsers/infra/http/routers/sessions.routes';


const routes = Router();

routes.use('/users', usersRouter)
routes.use('/books', booksRouter)
routes.use('/borrows', borrowsRouter)
routes.use('/admin', adminRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
