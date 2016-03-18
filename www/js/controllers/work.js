angular.module('app').controller('workCtrl', function($scope, $state, $stateParams, UserService, ProficiencyService) {
  $scope.profs = {}
  $scope.user = {}
  $scope.selectedProfs = []

  $scope.selectedBranches = []

  var userId = $stateParams.userId
  UserService.get({ userId: userId }).then(function (data) {
    $scope.user = data
    $scope.selectedBranches = data._source.branches
  })

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

  $scope.save = function () {
    return UserService
      .update({
        userId: $stateParams.userId,
        selectedProfs: $scope.selectedProfs
      })
      .then(function () {
        return $state.go('user.thankYou', { userId: $stateParams.userId })
      })
      .catch(function (error) {
        console.log('error', error)
        alert('Something went wrong!')
      })
  }

  // Load top level from API.
  $scope.setProfsFromApi(0)

  $scope.$watch('selectedBranches', function (sb) {
    sb.map(function (b) {
      $scope.setProfsFromApi(b)
    })
  })
})
