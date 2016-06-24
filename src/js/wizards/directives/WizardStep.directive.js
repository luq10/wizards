(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStep', function () {
      return {
        restrict: 'E',
        require: '^wizard',
        templateUrl: 'views/elements/wizard-step.html',
        replace: true,
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController) {
          scope.wizard = wizardController;

          /**
           * Initialize
           */
          (function(){
            var name = element.find('h1').text();
            var desc = element.find('p').text();

            var stepIndex = wizardController.getNextIndex();

            scope.$on('changeActiveStep', function(event, data){
              if(stepIndex === data.index){
                element.removeClass('hide');
                return;
              }

              element.addClass('hide');
            });

            wizardController.addStep(name, desc);
          }());
        }
      }


    });
}());
