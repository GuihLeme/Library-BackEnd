import "reflect-metadata";

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBorrowService from '../../../services/CreateBorrowService';
import ListActiveBorrowsService from '../../../services/ListActiveBorrowsService';
import RenewBorrowReturnAtService from '../../../services/RenewBorrowReturnAtService';
import ReturnedBookService from '../../../services/ReturnedBookService';
import BooksThatShouldBeReturnedThisWeekService from '../../../services/BooksThatShouldBeReturnedThisWeekService';

export default class BorrowsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { book, user } = request.body;

    const createBorrow = container.resolve(CreateBorrowService);

    const borrow = await createBorrow.execute({
      book,
      user
    });

    return response.json(borrow);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listBorrows = container.resolve(ListActiveBorrowsService)

    const activeBorrows = await listBorrows.execute()

    return response.json(activeBorrows);
  }

  public async update_renew(request: Request, response: Response): Promise<Response> {
    const { borrow_id } = request.params;

    const renewBorrow = container.resolve(RenewBorrowReturnAtService)
    const renewedBorrow = await renewBorrow.execute({borrow_id})

    return response.json(renewedBorrow)
  }

  public async update_return(request: Request, response: Response): Promise<Response> {
    const { borrow_id } = request.params;

    const returnBorrow = container.resolve(ReturnedBookService)

    const returnedBorrow = returnBorrow.execute({ borrow_id })

    return response.json(returnedBorrow)
  }

  public async index_return_this_week(request: Request, response: Response): Promise<Response> {
    const returnBorrow = container.resolve(BooksThatShouldBeReturnedThisWeekService)

    const returnThisWeekBooks = await returnBorrow.execute()

    return response.json(`${returnThisWeekBooks.length}`)
  }
}
