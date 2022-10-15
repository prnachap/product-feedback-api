import mongoose from 'mongoose';
import config from 'config';
import logger from '../../logger';

mongoose.connection.once('open', () => {
  logger.info('MongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
  logger.error(error);
  process.exit(1);
});

async function connect() {
  const dbUri = config.get<string>('dbUri');
  await mongoose.connect(dbUri);
}

export default connect;
