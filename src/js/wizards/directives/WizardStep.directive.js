(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStep', function ($timeout) {
      return {
        restrict: 'EA',
        require: '^wizard',
        templateUrl: 'views/elements/wizard-step.html',
        replace: true,
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController) {
          // We must know index of this step before add step to wizard controller
          // because before add we must register listener on 'changeActiveStep' event
          var stepIndex = wizardController.getNextIndex();

          var form          = element.find('form');
          var firstInput    = (form) ? form.find('input')[0] : null;
          var submitButton  = (form) ? form.find('button[type="submit"]') : null;

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
            var name = element.find('h2').text().trim();
            var desc = element.find('p').text().trim();

            // TODO: Event activeStep:X and deactiveStep:X will be better
            scope.$on('changeActiveStep', function(event, data){
              if(stepIndex === data.index){
                element.removeClass('hide');

                if(firstInput){
                  firstInput.focus();
                }

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

            // Hire is some kind of hack.
            // Wizard directives compile in order which are defined in DOM e.g: for this HTML:
            //
            // <wizard>
            //  <div>
            //    <wizard-step></wizard-step>
            //  </div>
            //  <div>
            //    <wizard-navigation></wizard-navigation>
            //  </div>
            //  <div>
            //    <wizard-pagination></wizard-pagination>
            //  </div>
            // </wizard>
            //
            // Order will be:
            // 1. wizard
            // 2. wizard-step
            // 3. wizard-navigation
            // 4. wizard-pagination
            //
            // To work correctly: wizard-navigation and wizard-pagination must register event listener before wizard-step
            // add step. Angular directives has something called 'priority' but it works only if directives has the same
            // parent node. That`s why this logic of add new step it`s some kind of freaky:
            //
            // - get index and save it
            // - wizard controller has private field of index
            // - must set an index to add new step
            //
            // But i dot`t know how do it better.
            $timeout(function(){
              wizardController.addStep(stepIndex, name, desc);
            });
          }

          /**
           * Watch form $valid change and inform wizard directive about change
           */
          function watchValidationOfForm(){
            if(0 === form.length){
              // No form in this step
              return;
            }

            var formController = angular.element(form).scope()[form.attr('name')];

            // Watching on function is not good for performance
            // I see code when someone write something like this:
            //
            // scope.formController = formController
            // scope.$watch('formController.$valid', function(){
            //    (...)
            // )
            //
            // But this looks like a shit, but maybe is better for performance. Need tests.
            scope.$watch(function(){
              return formController.$valid;
            }, function(isValid){
              // Emit is sucks, all parent scopes can watch this... I want to emit this only up to wizard directive
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
