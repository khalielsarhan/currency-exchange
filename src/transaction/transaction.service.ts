import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../user/schemas/transaction.schema';
import { CurrencyController } from '../currency/currency.controller';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private currencyController: CurrencyController,
  ) {}

  async create(
    userId: string,
    amount: number,
    amountTransfredto: number,
    from: string,
    to: string,
  ): Promise<Transaction> {
    const convertedCurrency = await this.currencyController.convertCurrency(
      from,
      to,
      amount,
    );
    amount = convertedCurrency.amount;
    amountTransfredto = convertedCurrency.convertedAmount;
    const transaction = new this.transactionModel({
      userId,
      amount,
      amountTransfredto,
      from,
      to,
    });
    return transaction.save();
  }

  async findAllByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).exec();
  }
}
