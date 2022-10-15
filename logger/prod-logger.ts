const { createLogger, format, transports } = require('winston');

function prodLogger() {
  return createLogger({
    format: format.json(),
    defaultMeta: { service: 'user-serive' },
    transports: [new transports.Console()],
  });
}
export default prodLogger;
