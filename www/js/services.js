angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('UserService', function ($resource) {
  var User = $resource('http://api.competency.se/users/:userId', {
    userId: '@userId'
  }, {
    update: { method: 'PUT' }
  })

  var self = this
  var user

  return {
    create: function (phoneNumber) {
      self.user = new User()
      self.user.phoneNumber = phoneNumber
      self.user.selectedBranches = [ 8 ]
      return self.user
        .$save()
        .then(function (data) {
          self.user.userId = data.userId
          return Promise.resolve(data.userId)
        })
    },

    update: function (data) {
      if (self.user) {
        angular.extend(self.user, data)
      } else {
        self.user = data
      }
      return User
        .update({ userId: self.user.userId }, self.user)
        .$promise
        .then(function () {
          return Promise.resolve()
        })
    },

    get: function () {
      return self.user
    }
  }
})

.service('ProficiencyService', function ($resource) {
  return $resource(
    'http://api.competency.se/proficiencies/:id',
    { id: '@id' },
    {'query': { method: 'GET', isArray: true }}
  );
})
