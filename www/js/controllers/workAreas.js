angular.module('app').controller('workAreasCtrl', function ($scope, ProficiencyService, UserService, $state, $stateParams) {
  $scope.user = [] // The current user. Will be loaded on view init.
  $scope.proficiencies = {} // An object holding loaded proficiencies.
  $scope.userProficiencies = {} // An object holding true/false for user's proficiencies.
  $scope.show = [] // Tracks visible sub trees.

  var userId = $stateParams.userId

  $scope.loadProficiencies = function (parentId, parentName) {
    var index = $scope.show.indexOf(parentId)
    if (index > -1) {
      $scope.show.splice(index, 1)
    } else {
      $scope.show.push(parentId)
    }
    ProficiencyService.query({ id: parentId }).$promise
      .then(function (proficiencies) {
        if (proficiencies) {
          proficiencies.map(function (proficiency) {
            if (parentName) {
              $scope.proficiencies[parentName][proficiency._source.namn] = proficiency._source
              $scope.userProficiencies[parentName][proficiency._source.namn] = true
            } else {
              $scope.proficiencies[proficiency._source.namn] = proficiency._source
              $scope.userProficiencies[proficiency._source.namn] = false
            }
          })
        }
      })
  }

  $scope.goToWork = function () {
    return UserService
      .update({
        userId: $stateParams.userId,
        proficiencies: $scope.userProficiencies
      })
      .then(function () {
        return $state.go('user.thankYou', { userId: $stateParams.userId })
      })
      .catch(function (error) {
        console.log('error', error)
        alert('Sorry! An error occurred.')
      })
  }

  // Get the user object and figure out selected proficiencies.
  UserService.get({ userId: userId }).then(function (data) {
    $scope.user = data._source
  })
  .then(function () {
    Object.keys($scope.user.proficiencies).map(function (key) {
      console.log('Processing key', key)
    })
    // Load all proficiencies.
    $scope.loadProficiencies(0)
  })
})
