angular.module('app.controllers', [])

.controller('phoneCtrl', function($scope, $state, UserService) {
  'use strict'

  $scope.phoneNumber = ''

  $scope.login = function (phoneNumber) {
    return UserService
      .create(phoneNumber)
      .then(function (userId) {
        return $state.go('user', { userId })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})

.controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams) {
  $scope.user = {}

  $scope.updateProfile = function (user) {
    user.userId = $stateParams.userId

    return UserService
      .update(user)
      .then(function () {
        return $state.go('user.workAreas', { userId: user.userId })
      })
      .catch(function (error) {
        alert(error)
      })
  }
})

.controller('workAreasCtrl', function($scope, ProficiencyService) {
  $scope.branches = [];

  $scope.profs = ProficiencyService.query().$promise.then(function (data) {
    $scope.branches = data;
  });
})

.controller('workCtrl', function($scope) {

})

.controller('thankYouCtrl', function($scope) {

})
