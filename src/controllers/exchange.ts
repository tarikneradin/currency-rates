import { Response } from 'express';

import { ExchangeRequestSchema } from '../schemes/exchange';
import { ValidatedRequest } from 'express-joi-validation';
import ExchangeMessage from '../types/SQS';
import sqs from '../sqs';

/**
 * Home page.
 * @route GET /
 */
export const getConversionRate = (req: ValidatedRequest<ExchangeRequestSchema>, res: Response): Response<any> => {
  try {
    const { currencyFrom, currencyTo, email } = req.query;
    const sqsPayload: ExchangeMessage = {
      currencyFrom,
      currencyTo,
      email,
    };

    console.log(`Exchange rate requested.`);
    sqs.sendMessage(`conversion`, sqsPayload);
    return res.sendStatus(200);
  } catch (error) {
    console.log(`error`, error);
    return res.sendStatus(400);
  }
};
