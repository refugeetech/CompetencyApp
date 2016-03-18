angular.module('app.controllers', [])

/*
 * ThankUCtrl
 */
.controller('thankYouCtrl', function ($scope, UserCountService) {
  $scope.count = UserCountService.get()
})
