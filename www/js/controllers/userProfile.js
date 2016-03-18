angular.module('app').controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams, cities) {
  $scope.user = {}
  $scope.cities = cities
  $scope.valid = {
    birthYear: true
  }


  var user = UserService
    .get({ userId: $stateParams.userId })
    .then(function (result) {
      $scope.user = result._source
    })

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

  $scope.$watch('user.birthYear', function (by) {
    if (by === '') {
      $scope.valid.birthYear = true
    } else if (parseInt(by)) {
      $scope.valid.birthYear = true
    } else {
      $scope.valid.birthYear = false
    }
  }, true)
})
