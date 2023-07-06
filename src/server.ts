/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import http from 'http';
import app from './app';
import connect from './utils/connect';
import logger from '../logger';
import swaggerDocs from './utils/swagger';

const PORT = config.get<number>('port');

const server = http.createServer(app);

server.listen(PORT, async () => {
  logger.info(`server started on port ${PORT}`);
  await connect();
  swaggerDocs(app, PORT);
});
