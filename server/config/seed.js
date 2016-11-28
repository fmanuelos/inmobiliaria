/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash');

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Company = require('../api/company/company.model');
var Building = require('../api/building/building.model');
var Unit = require('../api/unit/unit.model');
var Customer = require('../api/customer/customer.model');
var Contract = require('../api/contract/contract.model');
var Invoice = require('../api/invoice/invoice.model');
var ExchangeRate = require('../api/exchange_rate/exchange_rate.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function(err, data) {
//       user = data;
//       console.log('finished populating users'+ user);
//     }
//   );
// });


User.find({}).remove().exec()
  .then(function() {
    return User.create({
      provider: 'local',
      name:     'Test User',
      email:    'test@test.com',
      password: 'test'
    }, function(err, user) {
        return;
    });
  })
  .then(function() {
    return User.create({
      provider: 'local',
      role:     'admin',
      name:     'Admin',
      email:    'admin@admin.com',
      password: 'admin'
    }, function(err, user) {
        return;
    });
  })
  .then(function (user) {
    return Company.find({}).remove().exec()
      .then(function () {
        return user;
      });
  })
  .then(function (user) {
    return Company.create({
      name: 'Inmobiliaria Celu',
    })
    .then(function (company) {
      return {
        user:    user,
        company: company
      }
    });
  })
  .then(function (result) {
    result.company.users.push(result.user);
    return result;
  })
  .then(function (result) {
    return Building.find({}).remove().exec()
      .then(function () {
        return result;
      });
  })
  .then(function (result) {
    return Building.create({
      name:     'Centro de Negocios Akbal',
      company:  result.company
    })
    .then(function (building) {
      result.buildings = [building];
      return result;
    });
  })
  .then(function (result) {
    return Building.create({
      name:     'Rivera Lara',
      company:  result.company
    })
    .then(function (building) {
      result.buildings.push(building);
      return result;
    });
  })
  .then(function (result) {
    return Building.create({
      name:     'Plaza Micaela',
      company:  result.company
    })
    .then(function (building) {
      result.buildings.push(building);
      return result;
    });
  })
  .then(function (result) {
    return Building.create({
      name:     'Centro Ejecutivo Celu',
      company:  result.company
    })
    .then(function (building) {
      result.buildings.push(building);
      return result;
    });
  })
  .then(function (result) {
    return Building.create({
      name:     'Archivo Seguro',
      company:  result.company
    })
    .then(function (building) {
      result.buildings.push(building);
      return result;
    });
  })
  .then(function (result) {
    return Invoice.find({}).remove().exec()
      .then(function () {
        return result;
      });
  })
  .then(function (result) {
    return Invoice.create({
      serie:     'A',
      folio:     '1',
      amount:    10000,
      tax:       1600,
      total:     11600,
      seal_date: new Date(),
      cancel_date: new Date(),
      company:   result.company
    })
    .then(function (invoice) {
      result.invoices = [invoice];
      return result;
    });
  })
  .then(function (result) {
    var company = result.company;
    var buildings = result.buildings;
    var invoices = result.invoices;

    buildings.forEach(function (building) {
      company.buildings.push(building);
    })

    invoices.forEach(function (invoice) {
      company.invoices.push(invoice);
    })

    return Company.findById(company._id).exec()
    .then(function (data) {
      var updated = _.merge(data, company);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.company = updated;
      return result;
    });
  })
  .then(function (result) {
    return Unit.find({}).remove().exec()
      .then(function () {
        return result;
      });
  })
  .then(function (result) {
    return Customer.find({}).remove().exec()
      .then(function () {
        return result;
      });
  })
  .then(function (result) {
    return Contract.find({}).remove().exec()
      .then(function () {
        return result;
      });
  })
  .then(function (result) {
    return Unit.create({
      local:          1,
      surface:        501,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units = [[unit]];
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          2,
      surface:        501,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units[0].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          3,
      surface:        551,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units[0].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          4,
      surface:        551,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units[0].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          5,
      surface:        451,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units[0].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          10,
      surface:        100,
      type:           'Comercial',
      description:    'Local Alimentos',
      ocupated:       false,
      building:       result.buildings[0]
    })
    .then(function (unit) {
      result.units[0].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'ARTESANIAS PASO DEL NORTE, S.A. DE C.V.',
      tradename:      'ARTESANIAS PASO DEL NORTE, S.A. DE C.V.',
      rfc:            'APN120320PD2',
      address:        'Ave. Hermanos Escobar No. 6026-5',
      neiborhood:     'Col. Partido Romero',
      zipCode:        '32320',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Oscar Nuñez',
      email:          'aletorres_apn@yahoo.com',
      currency:       'dolares',
      building:       result.buildings[0]
    })
    .then(function (customer) {
      result.customers = [[customer]];
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'INGENIERIA Y DISEÑO AVANZADO, S. DE R.L. DE C.V.',
      tradename:      'INGENIERIA Y DISEÑO AVANZADO, S. DE R.L. DE C.V.',
      rfc:            'IDA110819SD7',
      address:        'Privada de los Gitanos No. 11631',
      neiborhood:     'Ortiz Rubio',
      zipCode:        '32548',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Paulina Ciria Merchan',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[0]
    })
    .then(function (customer) {
      result.customers[0].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'ARROW COMPONENTS MEXICO, S.A. DE C.V.',
      tradename:      'ARROW COMPONENTS MEXICO, S.A. DE C.V.',
      rfc:            'ACM841025CA5',
      address:        'Ejercito Nacional No. 216-8',
      neiborhood:     'Delegacion Miguel Hidalgo',
      zipCode:        '11590',
      city:           'Mexico D.F.',
      state:          'D.F.',
      country:        'Mexico',
      representative: 'Ana Maria Elena Bedia Sanchez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[0]
    })
    .then(function (customer) {
      result.customers[0].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'INTEGRATED LOGISTICS SYSTEMS, S.R.L. DE C.V.',
      tradename:      'INTEGRATED LOGISTICS SYSTEMS, S.R.L. DE C.V.',
      rfc:            'ILS9810063P8',
      address:        'Metalurgia No. 1513',
      neiborhood:     'Partido Escobedo',
      zipCode:        '45000',
      city:           'Tlaquepaque',
      state:          'Jalisco',
      country:        'Mexico',
      representative: 'Alejandra Gomez Lomeli',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[0]
    })
    .then(function (customer) {
      result.customers[0].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2012,8,1),
      endDate:        new Date(2015,7,31),
      monthlyRent:    '2064.12',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '250.5',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[0],
      unit:           result.units[0][0],
      customer:       result.customers[0][0],
    })
    .then(function (contract) {
      result.contracts = [[contract]];
      result.units[0][0].contracts.push(contract);
      result.customers[0][0].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[0][0];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[0][0] = updated;
      return result;
    });
  })
  // .then(function (result) {
  //   var customer = result.customers[0][0];

  //   return Customer.findById(customer._id).exec()
  //   .then(function (data) {
  //     var updated = _.merge(data, customer);
  //     result.updated =  updated;
  //     return result;
  //   });
  // })
  // .then(function (result) {
  //   var updated = result.updated;
  //   return updated.save().then(function () {
  //     result.customers[0][0] = updated;
  //     return result;
  //   });
  // })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2012,8,1),
      endDate:        new Date(2015,7,31),
      monthlyRent:    '1653.3',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '250.5',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[0],
      unit:           result.units[0][1],
      customer:       result.customers[0][1],
    })
    .then(function (contract) {
      result.contracts[0].push(contract);
      result.units[0][1].contracts.push(contract);
      result.customers[0][1].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[0][1];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[0][1] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[0][1];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[0][1] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2014,4,1),
      endDate:        new Date(2017,3,30),
      monthlyRent:    '3002.95',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '275.5',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[0],
      unit:           result.units[0][2],
      customer:       result.customers[0][2],
    })
    .then(function (contract) {
      result.contracts[0].push(contract);
      result.units[0][2].contracts.push(contract);
      result.customers[0][2].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[0][2];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[0][2] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[0][2];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[0][2] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2013,8,1),
      endDate:        new Date(2016,7,31),
      monthlyRent:    '2286.65',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '275.5',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[0],
      unit:           result.units[0][3],
      customer:       result.customers[0][3],
    })
    .then(function (contract) {
      result.contracts[0].push(contract);
      result.units[0][3].contracts.push(contract);
      result.customers[0][3].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[0][3];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[0][3] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[0][3];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[0][3] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2013,2,15),
      endDate:        new Date(2016,2,14),
      monthlyRent:    '1858.12',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '225.5',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[0],
      unit:           result.units[0][4],
      customer:       result.customers[0][0],
    })
    .then(function (contract) {
      result.contracts[0].push(contract);
      result.units[0][4].contracts.push(contract);
      result.customers[0][0].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[0][4];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[0][4] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[0][0];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[0][0] = updated;
      return result;
    });
  })
  .then(function (result) {
    var building = result.buildings[0];
    var contracts = result.contracts[0];
    var units = result.units[0];
    var customers = result.customers[0];

    contracts.forEach(function (contract) {
      building.contracts.push(contract);
    })

    units.forEach(function (unit) {
      building.units.push(unit);
    })

    customers.forEach(function (customer) {
      building.customers.push(customer);
    })

    return Building.findById(building._id).exec()
    .then(function (data) {
      var updated = _.merge(data, building);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.buildings[0] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          1,
      surface:        132,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[1]
    })
    .then(function (unit) {
      result.units.push([unit]);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          2,
      surface:        132,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[1]
    })
    .then(function (unit) {
      result.units[1].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          3,
      surface:        132,
      type:           'Bodega',
      description:    '',
      ocupated:       false,
      building:       result.buildings[1]
    })
    .then(function (unit) {
      result.units[1].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'STR AUTOMATION, S.A. DE C.V',
      tradename:      'STR AUTOMATION, S.A. DE C.V',
      rfc:            'SAU070425CU6',
      address:        'Ave Tecnologico No. 1345-5',
      neiborhood:     'Los Olmos',
      zipCode:        '32510',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Rogelio Valenzuela Renteria',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[1]
    })
    .then(function (customer) {
      result.customers.push([customer]);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CARLOS ABRAHAM PORTILLO GARIBAY',
      tradename:      'CARLOS ABRAHAM PORTILLO GARIBAY',
      rfc:            'POGC8204267E4',
      address:        'Ramon Rivera Lara No. 6005-3',
      neiborhood:     'Partido Iglesias',
      zipCode:        '32663',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Carlos Abraham Portillo Garibay',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[1]
    })
    .then(function (customer) {
      result.customers[1].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2015,6,1),
      endDate:        new Date(2016,5,30),
      monthlyRent:    '858',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '75',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[1],
      unit:           result.units[1][0],
      customer:       result.customers[1][0],
    })
    .then(function (contract) {
      result.contracts.push([contract]);
      result.units[1][0].contracts.push(contract);
      result.customers[1][0].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[1][0];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[1][0] = updated;
      return result;
    });
  })
  // .then(function (result) {
  //   var customer = result.customers[1][0];

  //   return Customer.findById(customer._id).exec()
  //   .then(function (data) {
  //     var updated = _.merge(data, customer);
  //     result.updated =  updated;
  //     return result;
  //   });
  // })
  // .then(function (result) {
  //   var updated = result.updated;
  //   return updated.save().then(function () {
  //     result.customers[1][0] = updated;
  //     return result;
  //   });
  // })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2014,7,1),
      endDate:        new Date(2015,6,31),
      monthlyRent:    '858',
      taxRate:        16,
      currency:       'pesos',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '75',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[1],
      unit:           result.units[1][1],
      customer:       result.customers[1][0],
    })
    .then(function (contract) {
      result.contracts[1].push(contract);
      result.units[1][1].contracts.push(contract);
      result.customers[1][0].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[1][1];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[1][1] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[1][0];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[1][0] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Contract.create({
      startDate:      new Date(2015,0,1),
      endDate:        new Date(2016,11,1),
      monthlyRent:    '924',
      taxRate:        16,
      currency:       'dolares',
      paymentMethod:  'Transferencia Electronica',
      deposit:        '',
      maintenanceFee: '92.4',
      taxOverdue:     '',
      marginsDay:     10,
      building:       result.buildings[1],
      unit:           result.units[1][2],
      customer:       result.customers[1][1],
    })
    .then(function (contract) {
      result.contracts[1].push(contract);
      result.units[1][2].contracts.push(contract);
      result.customers[1][1].contracts.push(contract);
      return result;
    });
  })
  .then(function (result) {
    var unit = result.units[1][2];
    return Unit.findById(unit._id).exec()
    .then(function (data) {
      var updated = _.merge(data, unit);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.units[1][2] = updated;
      return result;
    });
  })
  .then(function (result) {
    var customer = result.customers[1][1];

    return Customer.findById(customer._id).exec()
    .then(function (data) {
      var updated = _.merge(data, customer);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.customers[1][1] = updated;
      return result;
    });
  })
  .then(function (result) {
    var building   = result.buildings[1];
    var contracts  = result.contracts[1];
    var units      = result.units[1];
    var customers  = result.customers[1];

    contracts.forEach(function (contract) {
      building.contracts.push(contract);
    })

    units.forEach(function (unit) {
      building.units.push(unit);
    })

    customers.forEach(function (customer) {
      building.customers.push(customer);
    })

    return Building.findById(building._id).exec()
    .then(function (data) {
      var updated = _.merge(data, building);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.buildings[1] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          2,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units.push([unit]);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          3,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          4,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          5,
      surface:        73,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          6,
      surface:        96,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          7,
      surface:        154,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          8,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          9,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          10,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          11,
      surface:        66,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[2]
    })
    .then(function (unit) {
      result.units[2].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GME TECHNOLOGY DE MEXICO, S.A. DE C.V.',
      tradename:      'GME TECHNOLOGY DE MEXICO, S.A. DE C.V.',
      rfc:            'GTM1012091K1',
      address:        'Blvd. Manuel Gomez Morin No. 9321-2',
      neiborhood:     'Partido Senecú',
      zipCode:        '32470',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Irma Lizeth Alamillo Soto',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers.push([customer]);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'INMOBILIARIA M M S DE RL DE CV',
      tradename:      'INMOBILIARIA M M S DE RL DE CV',
      rfc:            'IUM150406KTA',
      address:        'Camino Escudero No. 9400',
      neiborhood:     'Hacienda De La Paloma',
      zipCode:        '32545',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Marco Antonio Ceniceros Cisneros',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'SERVICIO INDUSTRIAL DE COMEDORES, S.A. DE C.V.',
      tradename:      'SERVICIO INDUSTRIAL DE COMEDORES, S.A. DE C.V.',
      rfc:            'SIC701029BL4',
      address:        'Blvd. Manuel Gomez Morin No. 9321-4',
      neiborhood:     'Col. Fray Garcia De San Francisco',
      zipCode:        '32575',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Juan Antonio Perez Vazquez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'INMOBILIARIA ESCOBAR, VALDEZ Y HERMANOS, S.A DE C.V.',
      tradename:      'INMOBILIARIA ESCOBAR, VALDEZ Y HERMANOS, S.A DE C.V.',
      rfc:            'IEV9304053V4',
      address:        'Blvd. Manuel Gomez Morin No. 9321-6',
      neiborhood:     'Col. Fray Garcia De San Francisco',
      zipCode:        '32575',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Pedro Sanchez Ramirez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'LABORATORIOS PISA, S.A. DE C.V.',
      tradename:      'LABORATORIOS PISA, S.A. DE C.V.',
      rfc:            'LPI830527KJ2',
      address:        'Av. España No. 1840',
      neiborhood:     'Col. Moderna',
      zipCode:        '44190',
      city:           'Guadalajara',
      state:          'Jalisco',
      country:        'Mexico',
      representative: 'Oscar Osorio Arechavaleta',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GERARDO RECIO GONZALEZ',
      tradename:      'GERARDO RECIO GONZALEZ',
      rfc:            'REGG550327EH4',
      address:        'Blvd. Manuel Gomez Morin No. 9321-8',
      neiborhood:     'Partido Senecú',
      zipCode:        '32470',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Gerardo Recio Gonzalez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'TAMPOMEX, S.A. DE C.V.',
      tradename:      'TAMPOMEX, S.A. DE C.V.',
      rfc:            'TAM0002016K9',
      address:        'Industria Vidriera No. 115',
      neiborhood:     'Fracc. Industrial Zapopan Norte',
      zipCode:        '45132',
      city:           'Zapopan',
      state:          'Jalisco',
      country:        'Mexico',
      representative: 'Jorge Javier Arciniega Jimenez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GERARDO SILVA HERNANDEZ',
      tradename:      'GERARDO SILVA HERNANDEZ',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'TRANQUILINO ROCHA ESPINOZA',
      tradename:      'TRANQUILINO ROCHA ESPINOZA',
      rfc:            'ROET680129ID7',
      address:        'Blvd. Manuel Gomez Morin No. 9321-11',
      neiborhood:     'Condominio Residencial San Francisco',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Tranquilino Rocha Espinoza',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[2]
    })
    .then(function (customer) {
      result.customers[2].push(customer);
      return result;
    });
  })
  .then(function (result) {
    var building = result.buildings[2];
    var units = result.units[2];
    var customers  = result.customers[2];

    units.forEach(function (unit) {
      building.units.push(unit);
    })

    customers.forEach(function (customer) {
      building.customers.push(customer);
    })

    return Building.findById(building._id).exec()
    .then(function (data) {
      var updated = _.merge(data, building);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.buildings[2] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          1,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units.push([unit]);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          2,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          3,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          4,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          5,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
    .then(function (result) {
    return Unit.create({
      local:          6,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          8,
      surface:        168,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          9,
      surface:        67,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          10,
      surface:        63.5,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          11,
      surface:        57,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          12,
      surface:        54,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          13,
      surface:        129,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          14,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          15,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          16,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          17,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          18,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          19,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          20,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          21,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          22,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          23,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          24,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          26,
      surface:        170,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          27,
      surface:        68,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          28,
      surface:        64.5,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          29,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          30,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          31,
      surface:        131,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          32,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          33,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          34,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          35,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          36,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          37,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          38,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          39,
      surface:        60,
      type:           'Oficina',
      description:    '',
      ocupated:       false,
      building:       result.buildings[3]
    })
    .then(function (unit) {
      result.units[3].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'DISTRIBUIDORA REYES G, S.A. DE C.V.',
      tradename:      'DISTRIBUIDORA REYES G, S.A. DE C.V.',
      rfc:            'DRG810506I80',
      address:        'Simona Barba No. 5110-2',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Lic. Javier Reyes Ramirez',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers.push([customer]);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CORPORATIVO LABGI, S.C.',
      tradename:      'CORPORATIVO LABGI, S.C.',
      rfc:            'CLA130823CI2',
      address:        'Calzada Estadio Sur No. 333 B-39',
      neiborhood:     'Centro',
      zipCode:        '27000',
      city:           'Torreon',
      state:          'Coahuila',
      country:        'Mexico',
      representative: 'Maria Loreto Gonzalez Marquez',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
   .then(function (result) {
    return Customer.create({
      name:           'HR SERVICES, S.C.',
      tradename:      'HR SERVICES, S.C.',
      rfc:            'HSE021005BY8',
      address:        'Simona Barba No. 5110-10',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Ricardo Weichsel Upton',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'ARMANDO MANRIQUEZ RUIZ',
      tradename:      'ARMANDO MANRIQUEZ RUIZ',
      rfc:            'MARA570217V94',
      address:        'Calle Juan José Escudero No. 2507-A',
      neiborhood:     'Santo Niño',
      zipCode:        '31200',
      city:           'Chihuahua',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Armando Manriquez Ruiz',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CONSULTORIA AKBAL, S.C.',
      tradename:      'CONSULTORIA AKBAL, S.C.',
      rfc:            'CAK971001JU8',
      address:        'Simona Barba No. 5110-18',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Mario Cepeda Lucero',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'RAFAEL RIVERA RODRIGUEZ',
      tradename:      'RAFAEL RIVERA RODRIGUEZ',
      rfc:            'RIRR620221SG3',
      address:        'Simona Barba No. 5110-8',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Rafael Rivera Rodriguez',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'MANTENIMIENTO PROFESIONAL DE INTERIORES, S.A. DE C.V.',
      tradename:      'MANTENIMIENTO PROFESIONAL DE INTERIORES, S.A. DE C.V.',
      rfc:            'MPI9711247J6',
      address:        'Simona Barba No. 5110-9',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Ana Maria Ruiz Soto',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'EXPRESO TRAVEL AND TOURS',
      tradename:      'EXPRESO TRAVEL AND TOURS',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'MHO TECNOLOGIA, S. DE R.L. DE C.V.',
      tradename:      'MHO TECNOLOGIA, S. DE R.L. DE C.V.',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'TRANSPORTES ALGOZA DEL NORTE, S.A. DE C.V.',
      tradename:      'TRANSPORTES ALGOZA DEL NORTE, S.A. DE C.V.',
      rfc:            'TAN950901T88',
      address:        'Simona Barba No. 5110-12',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Cesar Gonzalez Zapata',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'AXCEL TODO PARA SU CELULAR, S.A. DE C.V.',
      tradename:      'AXCEL TODO PARA SU CELULAR, S.A. DE C.V.',
      rfc:            'ATS930412TY6',
      address:        'Plutarco Elias Calles No. 1972',
      neiborhood:     'Fracc. Jardines De San Jose',
      zipCode:        '32390',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Ruben Arnoldo Rivera Chavira',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'EDGAR MONTOYA ZAVALA',
      tradename:      'EDGAR MONTOYA ZAVALA',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'KHNUM, S.A. DE C.V.',
      tradename:      'KHNUM, S.A. DE C.V.',
      rfc:            'KHN131019UR7',
      address:        'Simona Barba No. 5110-15',
      neiborhood:     'San Angel',
      zipCode:        '32389',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Luz Elva Mendoza Morales',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GRUPO RAOSARI, S DE RL DE CV',
      tradename:      'GRUPO RAOSARI, S DE RL DE CV',
      rfc:            'GRA031212589',
      address:        'Privada De Vallarta Y Sicomoros No. 5501',
      neiborhood:     'Las Granjas',
      zipCode:        '31160',
      city:           'Chihuahua',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Jesus Joel Cereceres Granillo',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GANASVARO, S. DE R.L. DE C.V.',
      tradename:      'GANASVARO, S. DE R.L. DE C.V.',
      rfc:            'GAN120904E64',
      address:        'Doctor Balmis No. 223-B',
      neiborhood:     'Doctores Deleg. Cuauhtemoc',
      zipCode:        '06720',
      city:           'Mexico',
      state:          'D.F.',
      country:        'Mexico',
      representative: 'Miriam Cabrera Ronzon',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'ADRIAN HUMBERTO DIAZ VILLALOBOS',
      tradename:      'ADRIAN HUMBERTO DIAZ VILLALOBOS',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CORPUS FACTURACION, S.A. DE C.V.',
      tradename:      'CORPUS FACTURACION, S.A. DE C.V.',
      rfc:            'CFA110411FW5',
      address:        'Av. Heroico Colegio Militar No. 4709-2',
      neiborhood:     'Nombre De Dios',
      zipCode:        '31105',
      city:           'Chihuahua',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Jose Roberto Silva Avila',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GENERAL NETWORKS, S.A. DE C.V.',
      tradename:      'GENERAL NETWORKS, S.A. DE C.V.',
      rfc:            'GNE140527223',
      address:        'Villas Del Sirio No. 5822',
      neiborhood:     'Cordilleras',
      zipCode:        '31124',
      city:           'Chihuahua',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Fidel Antonio Soto Reyes',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'WITTMAN BATTENFELD MEXICO, S.A. DE C.V.',
      tradename:      'WITTMAN BATTENFELD MEXICO, S.A. DE C.V.',
      rfc:            'WBM0011144W7',
      address:        'Rafael Sesma Huerta No. 21',
      neiborhood:     'Parque Industrial Finsa',
      zipCode:        '76246',
      city:           'Queretaro',
      state:          'Queretaro',
      country:        'Mexico',
      representative: '',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'SINDICATO DE TRABAJADORES AL SERVICIO DEL GOBIERNO DEL ESTADO',
      tradename:      'SINDICATO DE TRABAJADORES AL SERVICIO DEL GOBIERNO DEL ESTADO',
      rfc:            'STS870411JS2',
      address:        'Av. Teofilo Borunda No. 2122',
      neiborhood:     'Centro',
      zipCode:        '',
      city:           'Chihuahua',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Bernardina Garcia Murillo',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'LAURA KARINA URIBE FENTANES',
      tradename:      'LAURA KARINA URIBE FENTANES',
      rfc:            'UIFL751217U79',
      address:        'Simona Barba No. 5110-28',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Laura Karina Uribe Fentanes',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'AXTEL, S.A.B. DE C.V.',
      tradename:      'AXTEL, S.A.B. DE C.V.',
      rfc:            'AXT940727FP8',
      address:        'Blvd. Gustavo Díaz Ordaz Km. 3.33 L-1',
      neiborhood:     'Unidad San Pedro',
      zipCode:        '66215',
      city:           'San Pedro Garza',
      state:          'Nuevo Leon',
      country:        'Mexico',
      representative: 'Aldo Lecanda Beckmann',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'LETICIA GARCIA RODRIGUEZ',
      tradename:      'LETICIA GARCIA RODRIGUEZ',
      rfc:            'GARL530602G56',
      address:        'Simona Barba No. 5525 L-4',
      neiborhood:     'Partido Las Fuentes',
      zipCode:        '32370',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Leticia Garcia Rodriguez',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'IMPULSO EMPRESARIAL DE JUAREZ, S.A. DE C.V.',
      tradename:      'IMPULSO EMPRESARIAL DE JUAREZ, S.A. DE C.V.',
      rfc:            'IEJ0807243X4',
      address:        'Simona Barba No. 5110-17',
      neiborhood:     'San Angel',
      zipCode:        '32328',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Enrique Martinez Joo',
      email:          'fmiranda@akbalsc.com',
      currency:       'pesos',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'MARIA DE LOS ANGELES SALAS CEPEDA',
      tradename:      'MARIA DE LOS ANGELES SALAS CEPEDA',
      rfc:            'SACA750101I9A',
      address:        'Simona Barba No. 5110-34',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Maria De Los Angeles Salas Cepeda',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'SISTEMAS DE INTEGRACIÒN ADMINISTRATIVA S.A DE C.V.',
      tradename:      'SISTEMAS DE INTEGRACIÒN ADMINISTRATIVA S.A DE C.V.',
      rfc:            'SIA0404025R3',
      address:        'Simona Barba No. 5110-35',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Abel Peña Rodriguez',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'TRANSPORTES GAMER, S.A. DE C.V.',
      tradename:      'TRANSPORTES GAMER, S.A. DE C.V.',
      rfc:            'TGA131106AV6',
      address:        'Simona Barba No. 5110-39',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: '',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[3]
    })
    .then(function (customer) {
      result.customers[3].push(customer);
      return result;
    });
  })
  .then(function (result) {
    var building = result.buildings[3];
    var units = result.units[3];
    var customers  = result.customers[3];

    units.forEach(function (unit) {
      building.units.push(unit);
    })

    customers.forEach(function (customer) {
      building.customers.push(customer);
    })

    return Building.findById(building._id).exec()
    .then(function (data) {
      var updated = _.merge(data, building);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.buildings[3] = updated;
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          1,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units.push([unit]);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          2,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          3,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          5,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          6,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          7,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          8,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Unit.create({
      local:          9,
      surface:        8,
      type:           'Comercial',
      description:    '',
      ocupated:       false,
      building:       result.buildings[4]
    })
    .then(function (unit) {
      result.units[4].push(unit);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CONSULTORIA AKBAL, S.C.',
      tradename:      'CONSULTORIA AKBAL, S.C.',
      rfc:            'CAK971001JU8',
      address:        'Simona Barba No. 5110-18',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Mario Cepeda Lucero',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers.push([customer]);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'SOLUCIONES ADMINISTRATIVAS SAID',
      tradename:      'SOLUCIONES ADMINISTRATIVAS SAID',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'CONSORCIO GALLO DE MÉXICO S DE RL DE CV',
      tradename:      'CONSORCIO GALLO DE MÉXICO S DE RL DE CV',
      rfc:            'CGM110824239',
      address:        'Calle 18 No. 1811',
      neiborhood:     'Zona Centro',
      zipCode:        '32330',
      city:           'Matamoros',
      state:          'Tamaulipas',
      country:        'Mexico',
      representative: 'Lic. Susana Espinoza',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'ADRIAN HUMBERTO DIAZ VILLALOBOS',
      tradename:      'ADRIAN HUMBERTO DIAZ VILLALOBOS',
      rfc:            'XAXX010101000',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Partido Escobedo',
      zipCode:        '32330',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Representante Legal',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'DEUTSCHE BANK MEXICO SA IBM DIVISION FIDUCIARIA F/1616',
      tradename:      'DEUTSCHE BANK MEXICO SA IBM DIVISION FIDUCIARIA F/1616',
      rfc:            'DBM121023M10',
      address:        'Ricardo Margain Zozaya No. 605',
      neiborhood:     'Santa Engracia',
      zipCode:        '66267',
      city:           'San Pedro Garza',
      state:          'Nuevo Leon',
      country:        'Mexico',
      representative: 'C.P. Deyanira Herrera Nava',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'GARRAT CALLAHAN INTERNATIONAL, S. DE R.L. DE C.V.',
      tradename:      'GARRAT CALLAHAN INTERNATIONAL, S. DE R.L. DE C.V.',
      rfc:            'GCI0304021Y8',
      address:        'Dia Del Telefonista No. 1132',
      neiborhood:     'Sauzal',
      zipCode:        '32700',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Mario Cepeda Lucero',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    return Customer.create({
      name:           'THE WATER INITIATIVE OF MEXICO, S. DE R.L. DE C.V.',
      tradename:      'THE WATER INITIATIVE OF MEXICO, S. DE R.L. DE C.V.',
      rfc:            'WIM0806026P1',
      address:        'Simona Barba No. 5110-19',
      neiborhood:     'Los Colorines',
      zipCode:        '32380',
      city:           'Juarez',
      state:          'Chihuahua',
      country:        'Mexico',
      representative: 'Mario Cepeda Lucero',
      email:          'fmiranda@akbalsc.com',
      currency:       'dolares',
      building:       result.buildings[4]
    })
    .then(function (customer) {
      result.customers[4].push(customer);
      return result;
    });
  })
  .then(function (result) {
    var building = result.buildings[4];
    var units = result.units[4];
    var customers  = result.customers[4];

    units.forEach(function (unit) {
      building.units.push(unit);
    })

    customers.forEach(function (customer) {
      building.customers.push(customer);
    })

    return Building.findById(building._id).exec()
    .then(function (data) {
      var updated = _.merge(data, building);
      result.updated =  updated;
      return result;
    });
  })
  .then(function (result) {
    var updated = result.updated;
    return updated.save().then(function () {
      result.buildings[4] = updated;
      return result;
    });
  })
  .then(function (result) {
    //result.units = [];
    //console.log(result.units[0]);
    console.log('finished clean and populating MongoDB');
  }, function(err) {
    // want to handle errors here
    console.log(err);
  });


// Company.find({}).remove(function() {
//   Company.create({
//     name: 'Inmobiliaria Celu',
//   }, function() {
//     console.log('remove company');ahorita te
//   });
// });

// Building.find({}).remove(function() {
//   console.log('remove building');
// });


ExchangeRate.find({}).remove(function() {
  ExchangeRate.create({
    date  : new Date(2016,1,2),
    value : 18.193500
  }, {
    date  : new Date(2016,1,3),
    value : 18.490200
  }, {
    date  : new Date(2016,1,4),
    value : 18.453700
  }, {
    date  : new Date(2016,1,5),
    value : 18.189100
  }, {
    date  : new Date(2016,1,8),
    value : 18.374800
  }, {
    date  : new Date(2016,1,9),
    value : 18.695900
  }, {
    date  : new Date(2016,1,10),
    value : 18.781800
  }, {
    date  : new Date(2016,1,11),
    value : 18.808900
  }, {
    date  : new Date(2016,1,12),
    value : 19.175400
  }, {
    date  : new Date(2016,1,15),
    value : 19.039200
  }, {
    date  : new Date(2016,1,16),
    value : 18.847100
  }, {
    date  : new Date(2016,1,17),
    value : 18.814800
  }, {
    date  : new Date(2016,1,18),
    value : 18.389500
  }, {
    date  : new Date(2016,1,19),
    value : 18.143900
  }, {
    date  : new Date(2016,1,22),
    value : 18.276200
  }, {
    date  : new Date(2016,1,16),
    value : 18.193500
  }, {
    date  : new Date(2016,1,22),
    value : 18.193500
  }, {
    date  : new Date(2016,1,23),
    value : 18.056800
  }, {
    date  : new Date(2016,1,24),
    value : 18.194800
  }, {
    date  : new Date(2016,1,25),
    value : 18.289300
  }, {
    date  : new Date(2016,1,26),
    value : 18.168000
  });
});

Unit.find({}).remove();
Customer.find({}).remove();
Contract.find({}).remove();
