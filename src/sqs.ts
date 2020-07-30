import { Squiss, IMessageToSend, IMessageAttributes } from 'squiss-ts';
import config from './config';
import console from 'console';

const DEFAULT_DELAY = 0;

class SQS {
  squiss: any;
  delay: number;

  constructor() {
    this.squiss = new Squiss({
      awsConfig: config.awsConfig,
      queueUrl: config.awsConfig.endpoint,
      bodyFormat: config.sqsConfig.bodyFormat,
      maxInFlight: config.sqsConfig.maxInFlight,
    });

    this.delay = DEFAULT_DELAY;
  }

  start(this: any): void {
    try {
      this.squiss.start();
    } catch (error) {
      console.log(`Error starting SQS: `, error);
    }
  }

  sendMessage(name: any, message: any, delay?: number, properties?: any): void {
    const messageToSend: IMessageToSend = {
      name,
      message,
    };

    const propertiesToSend: IMessageAttributes = {
      ...properties,
    };

    const messageDelay: number = delay || DEFAULT_DELAY;

    this.squiss.sendMessage(messageToSend, messageDelay, propertiesToSend);
  }

  onMessage(callback: any): void {
    this.squiss.on(`message`, (message: any) => {
      if (callback) {
        callback(message);
      }
    });
  }
}

export default new SQS();
