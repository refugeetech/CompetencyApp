angular.module('app').controller('phoneCtrl', function($scope, $state, UserService, AuthService) {
  'use strict'

  $scope.phoneNumber = ''
  $scope.errors = {
    phoneNumberMissing: false,
    phoneNumberBadFormat: false
  }

  $scope.login = function (phoneNumber) {
    $scope.errors = {
      phoneNumberMissing: false,
      phoneNumberBadFormat: false
    }

    if (!phoneNumber.length) {
      return $scope.errors.phoneNumberMissing = true
    }

    if (!/^(07\d{1})(\d{6,9})/.test(phoneNumber)) {
      return $scope.errors.phoneNumberBadFormat = true
    }

    return UserService
      .create(phoneNumber)
      .then(function (userId) {
        return $state.go('user', { userId })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  $scope.linkedIn = function () {
    AuthService.linkedIn()
  }
})
