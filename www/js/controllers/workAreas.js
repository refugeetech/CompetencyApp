angular.module('app').controller('workAreasCtrl', function($scope, ProficiencyService, UserService, $state, $stateParams) {
  $scope.user = []
  $scope.profs = []

  var userId = $stateParams.userId
  UserService.get({ userId: userId }).then(function (data) {
    $scope.user = data
    if (data._source.professions) {
      $scope.profs = data._source.professions
    } else {
      ProficiencyService.query({ id: 0 }).$promise.then(function (professions) {
        professions.map(function (d) {
          $scope.profs.push({
            id: d._source.id,
            name: d._source.namn,
            selected: false,
            children: [{
              id: 1000 + d._source.id,
              name: 'subcat' + 1000 + d._source.id,
              selected: false
            },{
              id: 1000 + d._source.id,
              name: 'subcat' + 1000 + d._source.id,
              selected: false
            },{
              id: 1000 + d._source.id,
              name: 'subcat' + 1000 + d._source.id,
              selected: false
            }]
          })
        })
      })
    }
  })

  $scope.goToWork = function () {
    return UserService
      .update({
        userId: $stateParams.userId,
        professions: $scope.profs
      })
      .then(function () {
        return $state.go('user.thankYou', { userId: $stateParams.userId })
      })
      .catch(function (error) {
        console.log('error', error)
        alert('Something went wrong!')
      })
  }
})
