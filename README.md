# Inmobiliaria

Aplicacion para administrar inmuebles y facturacion.


Uso de base a [Generator Angular FullStack v2.0.13](https://github.com/angular-fullstack/generator-angular-fullstack/tree/v2.0.13) 


## Install

Instalar las librerias del backend y frontend

```sh
npm install 
bower install
```
se necesita visual studio o gcc para compilar algunas librerias en c++ de node.

```sh
npm install --production
```
instala las dependencias para produccion


## Run

```sh
npm start
```
se necesita crear un start para produccion.
```sh
gulp server
```
corre version de desarrollo y se necesita de gulp-cli como global

```sh
npm install gulp-cli -g
```
https://github.com/gulpjs/gulp-cli



## Node.js Version Support

Supported: 0.12, 4.4.0 LTS


## DB

- MongoDB / (Necesita de MongoDB para funcionar) 

## Gulp Commands

Para correr la aplicacion se esta usando gulp

```sh
gulp server
```

Para inyectar los librerias frontend de bower en el index

```sh
gulp wiredep
```

Para inyectar los librerias frontend creadas en el index.

```sh
gulp inject
```

### Librerias de frontend en bower.json

```sh
  "dependencies": {
    "angular": ">=1.2.*",
    "json3": "~3.3.1",
    "es5-shim": "~3.0.1",
    "lodash": "~2.4.1",
    "normalize-css": "~3.0.3",
    "bootstrap": "~3.1.1",
    "angular-resource": ">=1.2.*",
    "angular-cookies": ">=1.2.*",
    "angular-sanitize": ">=1.2.*",
    "angular-animate": ">=1.2.*",
    "angular-bootstrap": "~0.14.3",
    "angular-ui-router": "~0.2.15",
    "angular-css": "~1.0.7",
    "font-awesome": ">=4.1.0",
    "components-font-awesome": "~4.5.0",
    "angular-bootstrap-switch": "~0.4.1",
    "angular-aside": "~1.3.2",
    "ui-select": "angular-ui-select#~0.13.2",
    "angular-ui-mask": "~1.8.1",
    "angular-marked": "~1.0.1"
  },
  "devDependencies": {
    "angular-mocks": ">=1.2.*",
    "angular-scenario": ">=1.2.*"
  }

```

### Librerias de backend en package.json

```sh
  "dependencies": {
    "body-parser": "~1.5.0",
    "composable-middleware": "^0.3.0",
    "compression": "~1.0.1",
    "connect-mongo": "^0.8.1",
    "cookie-parser": "~1.0.1",
    "cron": "^1.1.0",
    "ejs": "~0.8.4",
    "errorhandler": "~1.0.0",
    "express": "~4.9.0",
    "express-jwt": "^3.0.0",
    "express-session": "~1.0.2",
    "jsonwebtoken": "^5.0.0",
    "lodash": "~2.4.1",
    "method-override": "~1.0.0",
    "mongoose": "~4.0.3",
    "mongoose-currency": "^0.2.0",
    "morgan": "~1.0.0",
    "node-scrapy": "^0.2.2",
    "passport": "~0.2.0",
    "passport-local": "~0.1.6",
    "serve-favicon": "~2.0.1"
  },
  "devDependencies": {
    "connect-livereload": "~0.4.0",
    "gulp": "^3.9.0",
    "gulp-express": "^0.3.5",
    "gulp-inject": "^3.0.0",
    "wiredep": "^2.2.2"
  },
```

## Routes en backend

### bank account

```sh
GET     /bank_account              ->  index
POST    /bank_account              ->  create
GET     /bank_account/:id          ->  show
PUT     /bank_account/:id          ->  update
DELETE  /bank_account/:id          ->  destroy
```

Cuentas bancaria donde viene los pagos o depósitos

```sh
_id:            type: ObjectId
name:           type: String
number:         type: Number
currency:       type: String
account:        type: String   //cuenta bancaria del pago
isActive:       type: String
createBy:       type: String
created:        type: Date
```

### building


```sh
GET     /building              ->  index
POST    /building              ->  create
GET     /building/:id          ->  show
PUT     /building/:id          ->  update
DELETE  /building/:id          ->  destroy

GET     /building/:company/company      -> get buildings with id company
GET     /building/:company/contracts    -> get buildings and contracts with id company
GET     /building/:company/customers    -> get buildings and customers with id company
GET     /building/:company/units        -> get buildings and units with id company
```

Edificios o inmuebles que propiedad de cada compañía

```sh
_id:        type: ObjectId
name:       type: String, required
createBy:   type: String
created:    type: Date
company:    type: ObjectId, relationship a: Company._id
contracts:  type: ObjectId, relationship many: Contract._id
customers:  type: ObjectId, relationship many: Customer._id
units:      type: ObjectId, relationship many: Unit._id
```

### company

```sh
GET     /company              ->  index
POST    /company              ->  create
GET     /company/:id          ->  show
PUT     /company/:id          ->  update
DELETE  /company/:id          ->  destroy

GET     /company/:user/user     -> Get a single company with user id
GET     /company/:id/users      -> Get company and users with company id
GET     /company/:id/invoices   -> Get company and invoices with company id
```

Tabla principal de compañías que pueden administrar sus inmuebles

```sh
_id:        type: ObjectId
name:       type: String, required
createBy:   type: String
created:    type: Date
buildings:  type: ObjectId, relationship many: Building._id
invoices:   type: ObjectId, relationship many: Invoice._id
users:      type: ObjectId, relationship many: User._id
```

### contract

```sh
GET     /contract              ->  index
POST    /contract              ->  create
GET     /contract/:id          ->  show
PUT     /contract/:id          ->  update
DELETE  /contract/:id          ->  destroy

GET     /contract/:building/contracts   -> Get constrasts with building id
```

Contratos que de todos los clientes que rentan alguna unidad

```sh
_id:            type: ObjectId
name:           type: String, 
notes:          type: String
startDate:      type: Date     //fecha de inicio del contrato
endDate:        type: Date     //fecha de terminacionde contrato
monthlyRent:    type: Currency //renta mensual a facturar
taxRate:        type: Number   //impuesto de la factura
currency:       type: String   //tipo de moneda pesos o dolares
paymentMethod:  type: String   //metodo de pago de factura
deposit:        type: Currency //deposito para renta de unidad
guarantee:      type: String   //garancia para renta de la unidad
maintenanceFee: type: Currency //gastos de mantenimiento de inmueble
taxOverdue:     type: Currency //impuesto por pago atrasado
marginsDay:     type: Number   //dias de margen para pago
isActive:       type: Boolean  
createBy:       type: String
created:        type: Date
invonces:       type: ObjectId, relationship many: Invonce._id
building:       type: ObjectId, relationship a: Building._id
unit:           type: ObjectId, relationship a: Unit._id
customer:       type: ObjectId, relationship a: Customer._id
```

### customer

```sh
GET     /customer              ->  index
POST    /customer              ->  create
GET     /customer/:id          ->  show
PUT     /customer/:id          ->  update
DELETE  /customer/:id          ->  destroy

GET     /customer/:building/customers   -> Get customers with building id
```

Tabla de clientes de cada inmueble

```sh
_id:            type: ObjectId
name:           type: String, required
tradename:      type: String   //nombre de la marca o compañía
rfc:            type: String
address:        type: String
neiborhood:     type: String
zipCode:        type: String
city:           type: String
state:          type: String
country:        type: String
representative: type: String  //reperesentante legal de la compañía o cliente
email:          type: String
currency:       type: String  //tipo de moneda a facturar pesos o dolares
contacts:       [             //contantos de referencia para comunicarnos
                  name:         type: String
                  email:        type: String
                  phone:        type: String
                  position:     type: String
                  isActive:     type: Boolean //activo para envio de facturar automatica
                ] 
isActive:       type: Boolean
createBy:       type: String
created:        type: Date
building:       type: ObjectId, relationship a: Building._id
contracts:      type: ObjectId, relationship many: Contract._id
```

### exchange rate

```sh
GET     /exchange_rate              ->  index
POST    /exchange_rate              ->  create
GET     /exchange_rate/:id          ->  show
PUT     /exchange_rate/:id          ->  update
DELETE  /exchange_rate/:id          ->  destroy
```

Tabla de tipo de cambio se que se genera autometicamente para facturacion en dolares
http://dof.gob.mx/indicadores.php

```sh
_id:      type: ObjectId
date:     type: Date     //fecha de tipo de cambio
value:    type: Number   //valor de dia
```

### invoice

```sh
GET     /invoice              ->  index
POST    /invoice              ->  create
GET     /invoice/:id          ->  show
PUT     /invoice/:id          ->  update
DELETE  /invoice/:id          ->  destroy
```

Facturas que tiene cada compañía por la renta de inmuebles o extraordinarias

```sh
_id:           type: ObjectId
serie:         type: String       // serie de la factura A o NT
folio:         type: String        
amount:        type: Number
tax:           type: Number
total:         type: Number
seal_date:     type: Date         //fecha en a la que se realizo el sello
cancel_date:   type: Date         //fecha si es que se cancelo la factura
currency:      type: String       //tipo de moneda peso o dolares
uudi:          type: String       //identificador universal unico de a factura
create_by:     type: String
created:       type: Date
movements:     [                  //todos los movimientos de cada factura
                quantity: type: Number
                concept:  type: String
                amount:   type: Number
                tax:      type: Number
                total:    type: Number
                ]
payments:      type: ObjectId, relationship many: Payment._id
company:       type: ObjectId, relationship a: Company._id
customer:      type: ObjectId, relationship a: Customer._id
contract:      type: ObjectId, relationship a: Contract._id

```

### payment

```sh
GET     /payment              ->  index
POST    /payment              ->  create
GET     /payment/:id          ->  show
PUT     /payment/:id          ->  update
DELETE  /payment/:id          ->  destroy
```

Pagos de cada factura

```sh
_id:                 type: ObjectId
amount:              type: Number
comment:             type: String
currency:            type: String
exchangeAmount:      type: String  //tipo de cambio de dia de pago
exchangeNetGain:     type: String  //ganancia neta del tipo de cambio de la factura al dia de pago
referenceNumber:     type: String  //numero de referencia de deposito
paymentDate:         type: Date
createBy:            type: String
created:             type: Date
invonce:             type: ObjectId, relationship a: Invoice._id
bank_account:        type: ObjectId, relationship a: BankAccount._id
```

### unit

```sh
GET     /unit              ->  index
POST    /unit              ->  create
GET     /unit/:id          ->  show
PUT     /unit/:id          ->  update
DELETE  /unit/:id          ->  destroy

GET     /unit/:building/units   -> Get units with building id
```

Tabla de unidad son los locales de cada inmueble o edificio

```sh
_id:            type: ObjectId
local:          type: Number, required
surface:        type: Number
type:           type: String
description:    type: String
ocupated:       type: Boolean
created:        type: Date
createBy:       type: String
building:       type: ObjectId, relationship a: Building._id
contracts:      type: ObjectId, relationship many: Contract._id
```

### auth

```sh
POST    /auth/local             ->  get token with user and password
```

### user

```sh
GET     /user               ->  index with admin
DELETE  /user/:id           ->  destroy with admin
GET     /user/:id           ->  show user with token authentication
GET     /user/me            ->  show my user with token authentication
PUT     /user/:id/password  ->  update my yser password with token authentication
POST    /unit               ->  create sign up new user
```

Tabla de todos los usuarios que pernenecen a una compañía

```sh
name:           type: String
firstname:      type: String
lastname:       type: String
email:          type: String
role:           type: String, default: 'user' //rol de usuario admin o user
hashedPassword: type: String         //password encriptado
provider:       type: String
salt:           type: String         //llave de encriptación necesita password
isActive:       type: Boolean
```