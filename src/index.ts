import errorHandler from 'errorhandler';
// eslint-disable-next-line camelcase
import child_process from 'child_process';

import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get(`port`), () => {
  console.log(`  App is running at http://localhost:%d in %s mode`, app.get(`port`), app.get(`env`));
  console.log(`  Press CTRL-C to stop\n`);
});

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);

if (process.env.NODE_ENV === `development`) {
  // eslint-disable-next-line camelcase
  child_process.fork(__dirname + `/workers/exchangeCurrenciesWorker.js`);
}

export default server;
