angular.module('app.controllers', [])

.controller('phoneCtrl', function($scope, $state, UserService) {
  'use strict'

  $scope.phoneNumber = ''

  $scope.login = function (phoneNumber) {
    return UserService
      .create(phoneNumber)
      .then(id => $state.go('user', { id }))
      .catch(error => {
        console.log(error)
      })
  }
})

.controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams) {
  $scope.user = {}

  $scope.updateProfile = user => {
    user.id = $stateParams.id

    return UserService
      .update(user)
      .then(_ => {
        $state.go('user.workAreas', { id: user.id })
      })
      .catch(error => {
        alert(error)
      })
  }
})

.controller('workAreasCtrl', function($scope) {
  $scope.branches = [];

  /*
  ProficiencyService.get(0)
    .then((profs) => {
      console.log(profs)
      $scope.branches = profs
    })
    .catch(error => {
      console.log('ruh-rohes', error)
    })
    */
})

.controller('workCtrl', function($scope) {

})

.controller('thankYouCtrl', function($scope) {

})
