angular.module('app.controllers', [])

.controller('phoneCtrl', function($scope, $state, UserService) {
  'use strict'

  $scope.phoneNumber = ''

  $scope.login = function (phoneNumber) {
    return UserService
      .login(phoneNumber)
      .then((userId) => $state.go('workAreas'))
      .catch(error => {
        console.log(error)
      })
  }
})

.controller('workAreasCtrl', function($scope, ProficiencyService) {
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
