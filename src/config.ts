import path from 'path';
import dotenv from 'dotenv';
import { SQS } from 'squiss-ts';

class Config {
  env: string;
  root: string;
  port: string | number;
  ip: string;
  apiRoot: string;
  awsConfig: SQS.Types.ClientConfiguration;
  sqsConfig: any;
  exchangeApiKey: string;
  exchangeApiUrl: string;

  constructor() {
    dotenv.config({
      path: path.join(__dirname, `/../${process.env.NODE_ENV || `development`}.env`),
    });

    this.env = process.env.NODE_ENV || `development`;
    this.root = path.join(__dirname, `..`);
    this.port = process.env.PORT || 8080;
    this.ip = process.env.IP || `0.0.0.0`;
    this.apiRoot = process.env.API_ROOT || ``;
    this.exchangeApiKey = process.env.EXCHANGE_API_KEY || ``;
    this.exchangeApiUrl = process.env.EXCHANGE_API_URL || ``;

    this.awsConfig = {
      accessKeyId: process.env.SQS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY,
      region: process.env.SQS_REGION,
      endpoint: process.env.SQS_ENDPOINT,
    } as SQS.Types.ClientConfiguration;

    this.sqsConfig = {
      queueUrl: process.env.SQS_ENDPOINT,
      maxInFlight: process.env.SQS_MAX_IN_FLIGHT,
      bodyFormat: process.env.SQS_BODY_FORMAT,
    };
  }
}

export default new Config();
