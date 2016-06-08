angular.module('app').controller('userProfileCtrl', function ($scope, UserService, $state, $stateParams, cities) {
  $scope.user = {}

  $scope.cities = cities

  var user = UserService
    .get({ userId: $stateParams.userId })
    .then(function (result) {
      for (var key in result._source) {
        $scope.user[key] = result._source[key]
      }

      if (result._source.location) {
        $scope.user.location = cities.filter(function (x) {
          return x.value === result._source.location
        })[0]
      }

      $scope.user.birthDate = new Date($scope.user.birthDate)
    })

  $scope.updateProfile = function (user) {
    user.location = user.location ? user.location.value : ''
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
