'use strict';

angular.module('inmobiliariaApp')
	.config(function($stateProvider) {
		$stateProvider
			.state('invoice', {
				url: '/invoices',
				templateUrl: 'app/invoice/invoice.html',
				controller: 'InvoiceCtrl',
				authenticate: true
			});
	});