import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import database from './config/database';

const app = express();

const configureExpress = () => {
  app.set('port', process.env.PORT || 5000);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use('/', routes);

  return app;
};

export default () => database.connect().then(configureExpress);
