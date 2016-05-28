angular.module('app').controller('occupationsCtrl', function($scope, $state, UserService, AuthService, $translate, OccupationService) {
  'use strict'

  $scope.occupations = {}
  $scope.show = {}

  OccupationService.get().$promise
    .then(function (occupations) {
      $scope.occupations = occupations
    })

  $scope.toggle = function (what) {
    $scope.show[what] = !$scope.show[what]
  }

})
