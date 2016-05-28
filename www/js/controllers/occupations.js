angular.module('app').controller('occupationsCtrl', function($scope, $state, UserService, AuthService, $translate, OccupationService, $stateParams) {
  'use strict'

  $scope.occupations = {}
  $scope.show = {
    1: true,
    11: true,
    111: true
  }
  $scope.checked = {}
  $scope.user = {}

  $scope.saving = false

  UserService.get({ userId: $stateParams.userId })
    .then(function (data) {
      $scope.user = data._source
    })
    .then(function () {
      return OccupationService.get().$promise
    })
    .then(function (occupations) {
      $scope.occupations = occupations
    })
    .then(function () {
      $scope.user.occupations.map(function (occupation) {
        $scope.checked[occupation.code] = true
      })
    })

  $scope.toggle = function (what) {
    $scope.show[what] = !$scope.show[what]
  }

  $scope.chk = function (what) {
    $scope.checked[what] = !$scope.checked[what]
  }

  $scope.toggleOccupation = function (occupation) {
    $scope.chk(occupation.code)

    if (!$scope.user.occupations) {
      $scope.user.occupations = []
    }

    var occu = {
      code: occupation.code,
      name: occupation.name
    }
    $scope.user.occupations.push(occu)

    UserService
      .update({
        userId: $stateParams.userId,
        occupations: $scope.user.occupations
      })
      .then(function () {
        $scope.saving = false
      })
      .catch(function (error) {
        console.log('error', error)
        alert('Sorry! An error occurred.')
      })
  }

})
