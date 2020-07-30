import * as Joi from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

const exchangeQuerySchema = Joi.object({
  email: Joi.string().required(),
  currencyFrom: Joi.string().required(),
  currencyTo: Joi.string().required(),
});

interface ExchangeRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string;
    currencyFrom: string;
    currencyTo: string;
  };
}

export { ExchangeRequestSchema, exchangeQuerySchema };
