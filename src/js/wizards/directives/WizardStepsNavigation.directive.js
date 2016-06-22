(function () {
  'use strict';

  angular.module('wizards')
    .directive('wizardStepsNavigation', function ($templateRequest, $compile, $rootScope) {
      return {
        restrict: 'E',
        require: '^wizard',
        transclude: true,
        scope: {},

        link: function (scope, element, attrs, wizardController){
          var templatePath = attrs.template || 'views/elements/wizard-steps-navigation-default.html';

          (function(){
            var steps = [];

            scope.$on('addStep', function(event, data){
              steps.push(data);

              // if(!templateData){
              //   // Template is not load yet...
              //   return;
              // }
              //
              // generate(stepCache);
            });

            $templateRequest(templatePath, true)
              .then(function (templateData){
                var tplScope = $rootScope.$new();

                tplScope.steps  = steps;
                tplScope.wizard = wizardController;

                element.empty().append($compile(templateData)(tplScope));
              });
          }());

          // function generate(steps){
          //   var tplScope = $rootScope.$new();
          //
          //   tplScope.steps  = steps;
          //   tplScope.wizard = wizardController;
          //
          //   element.empty().append($compile(templateData)(tplScope));
          // }
        }
      }


    });
}());
