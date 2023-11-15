import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useModel: jest.fn(() => ({
            findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
          })),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  describe('findById', () => {
    it('should find and return the user with the given ID', async () => {
      const userId = 'exampleUserId';
      const user = { id: userId, name: 'John Doe' };

      jest.spyOn(userModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      } as any);

      const result = await service.findById(userId);

      expect(result).toEqual(user);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });
  });
});