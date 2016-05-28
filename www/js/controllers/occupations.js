angular.module('app').controller('occupationsCtrl', function($scope, $state, UserService, AuthService, $translate, OccupationService) {
  'use strict'

  $scope.occupations = {}

  OccupationService.get().$promise
    .then(function (occupations) {
      $scope.occupations = occupations
    })

})
