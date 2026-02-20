//const chalk = require('chalk');
import chalk from 'chalk';

const LogLevel = {
  INFO: 0,
  WARN: 1,
  ERROR: 2,
  DEBUG: 3,
};

class Logger {
  constructor(logLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  log(level, message) {
    if (level >= this.logLevel) {
      switch (level) {
        case LogLevel.INFO:
          console.log(chalk.blue(`INFO: ${message}`));
          break;
        case LogLevel.WARN:
          console.log(chalk.yellow(`WARN: ${message}`));
          break;
        case LogLevel.ERROR:
          console.log(chalk.red(`ERROR: ${message}`));
          break;
        case LogLevel.DEBUG:
          console.log(chalk.gray(`DEBUG: ${message}`));
          break;
        default:
          console.log(message);
      }
    }
  }

  info(message) {
    this.log(LogLevel.INFO, message);
  }

  warn(message) {
    this.log(LogLevel.WARN, message);
  }

  error(message) {
    this.log(LogLevel.ERROR, message);
  }

  debug(message) {
    this.log(LogLevel.DEBUG, message);
  }
}

module.exports = Logger;