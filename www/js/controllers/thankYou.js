angular.module('app').controller('thankYouCtrl', function ($scope, UserCountService) {
  $scope.count = UserCountService.get()
})
