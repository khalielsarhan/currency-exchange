import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  Transaction,
  TransactionDocument,
} from '../user/schemas/transaction.schema';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':userId/transactions')
  async createTransaction(
    @Body() transactionData: Transaction,
  ): Promise<Transaction> {
    const { userId, amount, from, to, amountTransfredto } = transactionData;
    return this.transactionService.create(
      userId,
      amount,
      amountTransfredto,
      from,
      to,
    );
  }

  @Get(':userId/transactions')
  async getTransactionsByUserId(
    @Param('userId') userId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.findAllByUserId(userId);
  }
}
