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
            index: 0,

            /**
             * Index of active step
             */
            activeStepIndex: null,

            /**
             * List of steps
             */
            steps: [],

            /**
             * List of step validation
             */
            validation: []
          };

          /**
           * Get next index for new step
           *
           * @returns {Number}
           */
          this.getNextIndex = function(){
            return _private.index++;
          };

          /**
           * Add new step
           *
           * @param {String} name
           * @param {String} name
           * @param {String} desc
           */
          this.addStep = function(index, name, desc){
            var data = {
              name: name,
              desc: desc
            };
            // var index = this.getNextIndex();

            _private.steps[index] = data;

            $scope.$broadcast('addStep', this.getStep(index));

            // If add first step, make this step default active
            if(0 === index){
              this.changeStep(0);
            }
          };

          /**
           *
           */
          this.changeStepValid = function(index, isValid){
            _private.validation[index] = isValid;

            // Emit event about change valid of state
            var step = this.getStep(index);
            step.valid = isValid;

            $scope.$broadcast('changeStepValid', step);
            $scope.$broadcast('changeStepValid:' + step.index, step);

            // Check if all steps is valid
            if(true === isValid && _private.validation.length === _private.steps.length){
              var isValidAll = true;

              for(var i = 0, ilen = _private.steps.length; i < ilen; i++){
                if(true !== _private.validation[i]){
                  isValidAll = false;
                  break;
                }
              }

              if(true === isValidAll){
                $scope.$broadcast('wizardValid');
              }
              else{
                $scope.$broadcast('wizardInvalid');
              }
            }
            else{
              $scope.$broadcast('wizardInvalid');
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
            var step = this.getStep(index);

            _private.activeStepIndex = index;

            $scope.$broadcast('changeActiveStep', step);
            $scope.$broadcast('changeActiveStep:' + index, step);
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

            this.changeStep(_private.activeStepIndex + 1);
          };

          /**
           * Return true if exist prev step
           *
           * @returns {Boolean}
           */
          this.isPrevStep = function(){
            var prevIndex = _private.activeStepIndex - 1;

            return (prevIndex >= 0 && _private.steps.length > 0);
          };

          /**
           * Change step to prev (if exist)
           */
          this.prevStep = function(){
            if(false === this.isPrevStep()){
              return;
            }

            this.changeStep(_private.activeStepIndex - 1);
          };
        }
      }


    });
}());
