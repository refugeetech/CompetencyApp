angular.module('app').controller('workAreasCtrl', function ($scope, ProficiencyService, UserService, $state, $stateParams) {
  $scope.user = []
  $scope.profs = []
  $scope.children = []
  $scope.loadedChildren = []

  $scope.proficiencies = {}
  $scope.userProficiencies = {}

  // Tracks visible trees.
  $scope.show = []

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
    if ($scope.loadedChildren.indexOf(parent.id) > -1) {
      return
    }
    $scope.loadedChildren.push(parent.id)
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
              $scope.userProficiencies[parentName][proficiency._source.namn] = false
            } else {
              $scope.proficiencies[proficiency._source.namn] = proficiency._source
              $scope.userProficiencies[proficiency._source.namn] = false
            }
          })
        }
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
          if (item.parentId === 0) {
            $scope.loadChildren(item)
          }
        }
      })
    })
  }

  function filterSelected (item) {
    return item.selected
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
        alert('Sorry! An error occurred.')
      })
  }

  // Do when view is loaded.
  $scope.loadProficiencies(0)
})
