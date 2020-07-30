import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';

// Controllers (route handlers)
import * as exchangeController from './controllers/exchange';
import { exchangeQuerySchema } from './schemes/exchange';
import { createValidator } from 'express-joi-validation';

// Create Express server
const app = express();
const validator = createValidator();
// Express configuration
app.set(`port`, process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */

app.get(`/exchange`, validator.query(exchangeQuerySchema), exchangeController.getConversionRate);

export default app;
