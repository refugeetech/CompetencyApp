angular.module('app').controller('occupationsCtrl', function($scope, $state, UserService, AuthService, $translate, OccupationService, $stateParams) {
  'use strict'

  $scope.show = {}
  $scope.user = {}
  $scope.checked = {}
  $scope.occupations = {}

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

    if ($scope.checked[occu.code]) {
      $scope.user.occupations.push(occu)
    } else {
      var index = 0
      $scope.user.occupations.map(function (rmOccupations) {
        if (rmOccupations.code === occu.code) {
          $scope.user.occupations.splice(index, 1)
        }
        index++
      })
    }

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

  $scope.goNext = function () {
    return $state.go('user.thankYou', { userId: $stateParams.userId })
  }
})
