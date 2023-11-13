import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { UserController } from './user/user.controller';
import { AuthService } from './user/auth/auth.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transaction/transaction.controller';
import { CurrencyController } from './currency/currency.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    CurrencyModule,
    UserModule,
    TransactionModule,
    MongooseModule.forRoot('mongodb://localhost/your-database-name'),
  ],
  controllers: [CurrencyController, UserController, TransactionController],
  providers: [TransactionService, AuthService, UserService],
})
export class AppModule {}
