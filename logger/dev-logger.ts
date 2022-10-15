const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

function devLogger() {
  const logFormat = printf(
    ({ level, message, timestamp, stack }: { level: string; message: string; timestamp: string; stack: any }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    }
  );

  return createLogger({
    level: 'http',
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
    transports: [new transports.Console()],
  });
}
export default devLogger;
