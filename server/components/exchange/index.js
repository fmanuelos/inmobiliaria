/**
 * Exchange Rate Cron Every Day
 */

'use strict';

var ExchangeRate = require('./exchange.scrapy');

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '0 0 8 * * 1-5',
  onTick: ExchangeRate,
  start: false,
  timeZone: 'US/Mountain'
});

job.start();
