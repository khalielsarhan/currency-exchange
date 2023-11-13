import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [],
})
export class CurrencyModule {}
