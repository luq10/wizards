(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStepsPagination', function () {
      return {
        restrict: 'EA',
        require: '^wizard',
        templateUrl: 'views/elements/wizard-steps-pagination-default.html',
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController){
          /**
           * Initialize
           */
          (function(){
            var buttons = element.find('button');

            var prev    = angular.element(buttons[0]);
            var next    = angular.element(buttons[1]);
            var finish  = angular.element(buttons[2]);

            // Disable pagination buttons
            disable(prev);
            disable(next);

            // Hide finish button
            finish.addClass('hide');

            // Enable next button when add step
            scope.$on('addStep', function(){
              enable(next);
            });

            // Show/hide finish button
            scope.$on('wizardInvalid', function(){
              finish.addClass('hide');
            });
            scope.$on('wizardValid', function(){
              finish.removeClass('hide');
            });

            // Disable/enable prev and next button
            prev.on('click', function(){
              wizardController.prevStep();
            });
            next.on('click', function(){
              wizardController.nextStep();
            });

            scope.$on('changeActiveStep', function(){
              if(false === wizardController.isPrevStep()){
                disable(prev);
              }
              else{
                enable(prev);
              }

              if(false === wizardController.isNextStep()){
                disable(next);
              }
              else{
                enable(next);
              }
            });
          }());

          /**
           *
           * @param {Element} element
           */
          function disable(element){
            element.attr('disabled', 'disabled');
          }

          /**
           *
           * @param {Element} element
           */
          function enable(element){
            element.removeAttr('disabled');
          }
        }
      }


    });
}());
