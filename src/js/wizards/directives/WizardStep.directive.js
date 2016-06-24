(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStep', function () {
      return {
        restrict: 'EA',
        require: '^wizard',
        templateUrl: 'views/elements/wizard-step.html',
        replace: true,
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController) {
          // We must know index of this step before add step to wizard controller
          // because after add we must register listener on 'changeActiveStep' event
          var stepIndex = wizardController.getNextIndex();

          scope.wizard = wizardController;

          /**
           * Initialize
           */
          (function(){
            create(stepIndex);
            watchValidationOfForm();
          }());

          /**
           * Create step
           */
          function create(stepIndex){
            var name = element.find('h2').text();
            var desc = element.find('p').text();

            // TODO: Event activeStep:X and deactiveStep:X will be better
            scope.$on('changeActiveStep', function(event, data){
              if(stepIndex === data.index){
                element.removeClass('hide');
                return;
              }

              element.addClass('hide');
            });

            scope.$on('changeStepValid:' + stepIndex, function(event, data){
              if(true === data.valid){
                element.removeClass('invalid');
                element.addClass('valid');
              }
              else{
                element.removeClass('valid');
                element.addClass('invalid');
              }
            });

            wizardController.addStep(name, desc);
          }

          /**
           * Watch form $valid change and inform wizard directive about change
           */
          function watchValidationOfForm(){
            var form = element.find('form');

            if(0 === form.length){
              // No form in this step
              return;
            }

            var formController = angular.element(form).scope()[form.attr('name')];

            scope.$watch(function(){
              return formController.$valid;
            }, function(isValid){
              // Emit is sucks, all parent scopes can watch this... I want to emit this only to wizard directive
              // (and all children of wizard directive)...
              //
              // scope.$emit('changeStepValid', {
              //   index:   stepIndex
              //   isValid: isValid
              // });

              wizardController.changeStepValid(stepIndex, isValid);

              onChangeFormValid(form, formController, isValid);
            });
          }

          /**
           *
           * @param {Element} form
           * @param {Object} formController
           * @param {Boolean} isValid
           */
          function onChangeFormValid(form, formController, isValid){
            // TODO: Store this! Not search DOM each time for this element.
            var submitButton = form.find('button[type="submit"]');

            if(true === isValid){
              submitButton.addClass('btn-success');
              submitButton.removeAttr('disabled');
            }
            else{
              submitButton.removeClass('btn-success');
              submitButton.attr('disabled', 'disabled');
            }
          }
        }
      }


    });
}());
