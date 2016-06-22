(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizard', function () {
      return {
        restrict:    'EA',
        templateUrl: 'views/elements/wizard.html',
        transclude: true,
        replace: true,
        scope: {},

        controller: function($scope){
          var _private = {
            activeStepIndex: null,

            steps: []
          };

          this.getNextIndex = function(){
            return _private.steps.length;
          };

          this.addStep = function(name, desc){
            var data = {
              name: name,
              desc: desc
            };
            var index = this.getNextIndex();

            _private.steps.push(data);

            $scope.$broadcast('addStep', {
              index:    index,
              stepData: data
            });

            // If add first step, make this step default active
            if(0 === index){
              this.changeStep(0);
            }
          };

          this.changeStep = function(index){
            $scope.$broadcast('changeActiveStep', {
              index:    index,
              stepData: _private.steps[index]
            });
          };

          this.nextStep = function(){
            var nextIndex = _private.activeStepIndex + 1;

            if(nextIndex >= _private.steps.length){
              return;
            }

            $scope.$broadcast('changeActiveStep', {
              index:    nextIndex,
              stepData: _private.steps[nextIndex]
            });
          }
        }
      }


    });
}());
