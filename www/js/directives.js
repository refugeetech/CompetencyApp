angular.module('app.directives', [])

.directive('occupationGroup', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: '/templates/directives/occupationGroup.html'
  }
}]);
