import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

@Controller('convert')
export class CurrencyController {
  @Get()
  // eslint-disable-next-line prettier/prettier
  async convertCurrency(@Query('from') from: string, @Query('to') to: string, @Query('amount') amount: number): Promise<any> {
    try {
      // eslint-disable-next-line prettier/prettier
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);

      const rates = response.data.rates;
      const conversionRate = rates[to];
      const convertedAmount = amount * conversionRate;

      return {
        from,
        to,
        amount,
        convertedAmount,
      };
    } catch (error) {
      throw new Error('Failed to convert currency.');
    }
  }
}
