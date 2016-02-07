angular.module('app.controllers', [])

.controller('phoneCtrl', function($scope, UserService) {
  'use strict'

  $scope.login = function () {
    let result = UserService.login($scope.phoneNumber);

    console.log('result', result)
  }
})

.controller('workAreasCtrl', function($scope) {

})

.controller('workCtrl', function($scope) {

})

.controller('thankYouCtrl', function($scope) {

})

