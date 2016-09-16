/**
 * Exchange Rate Scrapy
 */

'use strict';

var ExchangeRate = require('../../api/exchange_rate/exchange_rate.model');

var scrapy    = require('node-scrapy');
var model     = { date: 'table.Tabla_borde > .Celda > td:first-child',
                  value: 'table.Tabla_borde > .Celda > td:last-child'};

var ExchangeScrapy = function() {
  var date    = new Date();
  var url     = 'http://www.dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha='+
              ('0'+ date.getDate()).slice(-2) +'%2F'+
              ('0'+(date.getMonth()+1)).slice(-2) +'%2F'+
              date.getFullYear() +'&hfecha='+
              ('0'+ date.getDate()).slice(-2) +'%2F'+
              ('0'+(date.getMonth()+1)).slice(-2) +'%2F'+
              date.getFullYear();

  scrapy.scrape(url, model, function(err, data) {
    if (err) return console.error(err);
    if(data.date !== null || data.value !== null) {

      data.date = date;

      ExchangeRate.create(data, function(err, exchange_rate) {
        if (err) return console.error(err);
        return console.log('update exchange rate');
      });
    }
  });
};

module.exports = ExchangeScrapy;
