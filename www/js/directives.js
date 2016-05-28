angular.module('app.directives', [])

.directive('occupationGroup', [function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    templateUrl: '/templates/directives/occupationGroup.html',
    link: function () {
      console.log('huh')
    }
  }
}]);
