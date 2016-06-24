(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStepsNavigation', function ($templateRequest, $compile, $rootScope) {
      return {
        restrict: 'EA',
        require: '^wizard',
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController){
          var templatePath = attrs.template || 'views/elements/wizard-steps-navigation-default.html';

          /**
           * Initialize
           */
          (function(){
            var steps = [];

            // Important:
            //
            // We don`t anticipate that steps will be added after load application
            scope.$on('addStep', function(event, data){
              steps.push(data);
            });

            $templateRequest(templatePath, true)
              .then(function (templateData){
                var tplScope = $rootScope.$new();

                tplScope.steps  = steps;
                tplScope.wizard = wizardController;

                element.empty().append($compile(templateData)(tplScope));
              });
          }());
        }
      }


    });
}());
