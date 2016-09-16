'use strict';

angular.module('inmobiliariaApp')
  .controller('HelpModalCtrl', function ($scope, $uibModalInstance, $templateRequest, path){

  var url = 'app/' + path + '/' + path + '.md';

  $scope.markdown = '';

  $templateRequest(url, true)
    .then(function (data) {
        $scope.markdown = data;
    },
    function() {
      $scope.markdown = '# No existe documentacion \n \n' + 
        '## Est modo ossibus scissaeque anima si Iuno \n \n' +
        '> Lorem markdownum nudo: fraude. Libravit sine esse: iubent: aut voce truncaque ' +
        'tegit tamen, uno mihi avidusque tumidam quaecumque, inmania sceleri. Edidit ' +
        'vitta cum per de Abantiades iactu oculos: unda decimum addit herbida. Augusto ' +
        'nec solis non moverat **iuvenem gravis**: est opem.';
    });

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
