import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../user/schemas/transaction.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('TransactionService', () => {
  let service: TransactionService;
  let model: Model<TransactionDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    model = module.get<Model<TransactionDocument>>(
      getModelToken(Transaction.name),
    );
  });

  describe('findAllByUserId', () => {
    it('should return an array of transactions', async () => {
      const userId = 'exampleUserId';
      const expectedResult = [{ id: '1', amount: 100, currency: 'USD' }];

      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await service.findAllByUserId(userId);

      expect(result).toEqual(expectedResult);
      expect(model.find).toHaveBeenCalledWith({ userId });
    });
  });
});
