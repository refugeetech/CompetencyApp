angular.module('app').controller('workAreasCtrl', function($scope, ProficiencyService, UserService, $state, $stateParams) {
  $scope.user = []
  $scope.profs = []
  $scope.children = []

  var userId = $stateParams.userId
  UserService.get({ userId: userId }).then(function (data) {
    $scope.user = data
    ProficiencyService.query({ id: 0 }).$promise.then(function (professions) {
      if (professions) {
        professions.map(function (d) {
          $scope.profs.push({
            id: d._source.id,
            name: d._source.namn,
            parentId: 0,
            selected: false
          })
        })
      }
      ensureSelected(data._source.professions)
    })
  })

  $scope.loadChildren = function (parent) {
    if (!parent.selected) {
      return
    }
    ProficiencyService.query({ id: parent.id }).$promise.then(function (professions) {
      if (professions) {
        professions.map(function (d) {
          $scope.children.push({
            id: d._source.id,
            name: d._source.namn,
            parentId: parent.id,
            selected: false
          })
        })
      }
      ensureSelected(professions)
    })
  }

  function ensureSelected (professions) {
    if (!professions) {
      return
    }
    professions.filter(filterSelected).map(function (selectedProfession) {
      $scope.profs.map(function (item) {
        if (item.id === selectedProfession.id) {
          item.selected = true
        }
      })
    })
  }

  function filterSelected (item) {
    return item.selected
  }

  function filterByParent (item, parentId) {
    console.log(item, parentId)
    return false
  }

  $scope.goToWork = function () {
    return UserService
      .update({
        userId: $stateParams.userId,
        professions: $scope.profs.filter(filterSelected)
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
