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

  $scope.linkedIn = function () {
    console.log('LinkedIn click')
  }
})

.controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams, cities) {
  $scope.user = {}
  $scope.cities = cities

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

.controller('workAreasCtrl', function($scope, ProficiencyService, UserService, $state, $stateParams) {
  $scope.user = []
  $scope.branches = []

  $scope.selectBranch = function (branchId) {
    if ($scope.branches.indexOf(branchId) > -1) {
      $scope.branches.splice($scope.branches.indexOf(branchId))
    }
    else {
      $scope.branches.push(branchId)
    }
  }

  $scope.goToWork = function () {
    var userId = $stateParams.userId

    // TODO: Save $scope.branches with UserService.

    return $state.go('user.work', { userId: userId })
  }

  ProficiencyService.query({ id: 0 }).$promise.then(function (data) {
    $scope.profs = data
  })
})

.controller('workCtrl', function($scope, UserService, ProficiencyService) {
  $scope.profs = {}
  $scope.user = UserService.get()
  $scope.selectedProfs = []

  $scope.selectedBranches = [ 8 ] // TODO: Make sure it is read from API.

  $scope.isSelected = function (branch) {
    return $scope.selectedBranches.indexOf(branch._source.id) > -1
  }

  $scope.setProfsFromApi = function (parentId) {
    $scope.profs = ProficiencyService.query({ id: parentId }).$promise.then(function (data) {
      $scope.profs[parentId] = data
    })
  }

  $scope.selectProf = function (profId) {
    if ($scope.selectedProfs.indexOf(profId) > -1) {
      $scope.selectedProfs.splice($scope.selectedProfs.indexOf(profId))
    }
    else {
      $scope.selectedProfs.push(profId)
    }
  }

  $scope.setProfsFromApi(0)

  $scope.$watch('selectedBranches', function (sb) {
    sb.map(function (b) {
      $scope.setProfsFromApi(b)
    })
  })
})

.controller('thankYouCtrl', function($scope) {

})
