import axios from 'axios';
import sqs from '../sqs';
import config from '../config';

const EXCHANGE_API_LATEST_RATES_ENDPOINT = `latest.json`;

const onMessageReceived = async (qsqPayload: any): Promise<any> => {
  try {
    // since I have only free plan for openexchangerates I don't have an option to set base currency for the request, base currency for the free plan is always USD
    const response = await axios.get(
      `${config.exchangeApiUrl}${EXCHANGE_API_LATEST_RATES_ENDPOINT}?app_id=${config.exchangeApiKey}`
    );
    const sqsMessage = JSON.parse(qsqPayload.body).message;
    const { currencyFrom, currencyTo, email } = sqsMessage;
    const rates = response.data.rates;

    const conversionRate = rates[currencyTo];

    await sendEmail(currencyFrom, currencyTo, conversionRate, email);
    // del message from queue only in case when message is processed and email is sent to the user's email
    qsqPayload.del();
  } catch (error) {
    console.log(`SQS message could not be proccessed: `, error);
  }
};

console.log(`worker started!`);
sqs.start();
sqs.onMessage(onMessageReceived);

const sendEmail = async (
  currencyFrom: string,
  currencyTo: string,
  conversionRate: number,
  email: string
): Promise<void> => {
  setTimeout(() => {
    console.log(`Conversion rate: ${currencyFrom} <->  ${currencyTo} =  ${conversionRate} [${email}]`);
    console.log(`Email sent!`);
  }, 3000);
};
