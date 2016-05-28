angular.module('app.directives', [])

.directive('occupationGroup', [function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    templateUrl: '/templates/directives/occupationGroup.html',
    link: function (scope, element, attributes) {
      console.log('huh', scope.items)
      if (!!scope.items) {
        element.append('hey')
        //$compile(element.contents())(scope)
      }
    }
  }
}]);
