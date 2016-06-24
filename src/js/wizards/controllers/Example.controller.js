(function () {
  'use strict';

  angular.module('wizards')
    .controller('ExampleController', function ($scope){
      $scope.data = {};
      $scope.onComplete = onComplete;

      /**
       *
       * @param {Object} data
       */
      function onComplete(data){
        alert('Done');

        console.log(data);
      }
    });
}());
