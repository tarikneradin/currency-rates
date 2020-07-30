import { Response } from 'express';

import { ExchangeRequestSchema } from '../schemes/exchange';
import { ValidatedRequest } from 'express-joi-validation';
import ExchangeMessage from '../types/SQS';
import sqs from '../sqs';

/**
 * Home page.
 * @route GET /
 */
export const getConversionRate = (req: ValidatedRequest<ExchangeRequestSchema>, res: Response): void => {
  try {
    const { currencyFrom, currencyTo, email } = req.query;
    const sqsPayload: ExchangeMessage = {
      currencyFrom,
      currencyTo,
      email,
    };

    console.log(`Exchange rate requested.`);
    sqs.sendMessage(`conversion`, sqsPayload);
    res.sendStatus(200);
  } catch (error) {
    console.log(`error`, error);
    res.sendStatus(400);
  }
};
