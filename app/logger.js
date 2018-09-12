'use strict';

// //const winston = require('winston');
// const { createLogger, format, transports } = require('winston');
// const { combine, timestamp, label, printf } = format;

// const myFormat = printf(info => {
//     return `${info.timestamp} ${info.level}: ${info.message}`;
//   });

// module.exports = createLogger({
//     level: 'info',
//     format: combine(
//         label({ label: '' }),
//         timestamp(),
//         myFormat
//       ),
//     transports: [
//         new transports.Console()
//     ]
// });

var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(new winston.transports.Console({
  timestamp: true,
  level: 'verbose',
  colorize: true
}));
module.exports = winston;