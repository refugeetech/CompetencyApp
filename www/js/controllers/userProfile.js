angular.module('app').controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams, cities) {
  $scope.user = {}
  $scope.cities = cities

  var user = UserService
    .get({ userId: $stateParams.userId })
    .then(function (result) {
      $scope.user = result._source
      $scope.user.birthDate = new Date($scope.user.birthDate)
    })

  $scope.updateProfile = function (user) {
    user.userId = $stateParams.userId
    return UserService
      .update(user)
      .then(function () {
        return $state.go('user.occupations', { userId: user.userId })
      })
      .catch(function (error) {
        alert(error)
      })
  }
})
