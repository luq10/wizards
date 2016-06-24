(function () {
  'use strict';

  angular.module('wizards')
    .controller('Example2Controller', function ($scope){
      $scope.data = {};
      $scope.onComplete = onComplete;

      /**
       *
       * @param {Object} data
       */
      function onComplete(data){
        alert('well done my little friend. See console');

        console.log(data);
      }
    });
}());
