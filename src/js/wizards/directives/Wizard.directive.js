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
          /**
           * Private scope
           *
           * @private
           */
          var _private = {
            /**
             * Index of active step
             */
            activeStepIndex: null,

            /**
             * List of steps
             */
            steps: []
          };

          /**
           * Get next index for new step
           *
           * @returns {Number}
           */
          this.getNextIndex = function(){
            return _private.steps.length;
          };

          /**
           * Add new step
           *
           * @param {String} name
           * @param {String} desc
           */
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

          /**
           * Get step by index
           *
           * @param {Number} index
           * @returns {Object}
           */
          this.getStep = function(index){
            return {
              index:    index,
              stepData: _private.steps[index]
            }
          };

          /**
           * Change active step
           *
           * @param {Number} index
           */
          this.changeStep = function(index){
            $scope.$broadcast('changeActiveStep', {
              index:    index,
              stepData: _private.steps[index]
            });
          };

          /**
           * Return true if exist next step
           *
           * @returns {Boolean}
           */
          this.isNextStep = function(){
            var nextIndex = _private.activeStepIndex + 1;

            return (nextIndex < _private.steps.length);
          };

          /**
           * Change step to next (if exist)
           */
          this.nextStep = function(){
            if(false === this.isNextStep()){
              return;
            }

            var nextIndex = _private.activeStepIndex + 1;

            $scope.$broadcast('changeActiveStep', this.getStep(nextIndex));
          }
        }
      }


    });
}());
