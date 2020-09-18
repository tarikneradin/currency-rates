# Currency exchange rate API

Currency exchange rates is simple NodeJs application which provides REST API for fetching currency exchange rate. (Docker, SQS, NodeJs, NodeJs Workers, NGINX)

# Development mode

Start NodeJs API locally:

- yarn install
- yarn build
- yarn start
- NodeJs API should be available on `http://localhost:3000/`.
- Exchange currency example request: `http://localhost:3000/exchange?email=tarik.neradin@gmail.com&currencyFrom=USD&currencyTo=EUR`
- As a result, application will console log the following output: `Conversion rate: USD <-> EUR = 0.85114 [tarik.neradin@gmail.com]`

Start SQS locally:

- docker pull roribio16/alpine-sqs
- docker run --name alpine-sqs -p 9324:9324 -p 9325:9325 -d roribio16/alpine-sqs:latest
- SQS should be available on http://localhost:9325/.

Setting up environment file

- In project's root folder, create file named {environment}.env where
  {enivornment} is application environment. If you want to run app in
  development mode, then you'll create file named development.env.
  This file must contain all environment related values.
  List of mandatory key-value pairs that {environment}.env must contain(in comments you can find example values):

```
  NODE_ENV = {env} #development
  SQS_ACCESS_KEY_ID = {sqs_access_key_id} #dummy
  SQS_SECRET_ACCESS_KEY = {sqs_secret_access_key} #dummy
  SQS_REGION = {sqs_region} #dummy
  SQS_ENDPOINT = {sqs_queue_endpoint} #http://localhost:9324/queue/default
  SQS_MAX_IN_FLIGHT = {sqs_max_in_flight} #15
  EXCHANGE_API_KEY = {exchange_api_key} #407a7a8df78741478dffdedef314d24a
  EXCHANGE_API_URL = {exchange_api_url} #https://openexchangerates.org/api/
```

# Docker compose setup (SQS + NodeJs + Worker)

- yarn install
- yarn build
- docker-compose up --build
- docker-compose down

# High availability scenario docker setup (SQS + NodeJs x2 + Worker x2 + NGINX)

- The purpose of this setup is to reproduce high availability scenario with 2 instances of API and Exchange Worker, SQS service and NGINX as load balancer to achieve high availability and smooth handling of burstable loads. Therefore, we assure that server will not crash during load peaks.

- yarn install
- yarn build
- docker-compose -f docker-compose-ha.yml up --build
- docker-compose -f docker-compose-ha.yml down

NOTE:
Please note that Free Plan limit for Open Exchange Rates API is 1,0000 requests
