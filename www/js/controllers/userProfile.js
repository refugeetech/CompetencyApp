angular.module('app').controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams, cities) {
  $scope.user = {}
  $scope.cities = cities

  var user = UserService
    .get({ userId: $stateParams.userId })
    .then(function (result) {
      $scope.user = result._source
      if (result._source.location) {
        var location = result._source.location.split(', ')
        $scope.user.location = {
          value: result._source.location,
          city: location[0],
          region: location[1]
        }
      }
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
