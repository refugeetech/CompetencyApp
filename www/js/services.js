angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('UserService', function ($resource) {
  var User = $resource('http://api.competency.se/users/:userId', {
    userId: '@userId'
  }, {
    update: { method: 'PUT' }
  })

  var user

  return {
    create: function (phoneNumber) {
      user = new User()
      user.phoneNumber = phoneNumber
      return user
        .$save()
        .then(function (data) {
          user.userId = data.userId
          return Promise.resolve(data.userId)
        })
    },

    update: function (data) {
      if (user) {
        angular.extend(user, data)
      } else {
        user = data
      }
      return User
        .update({ userId: user.userId }, user)
        .$promise
        .then(function () {
          return Promise.resolve()
        })
    }
  }
})

.service('ProficiencyService', function ($resource) {
  var Proficiencies = $resource('http://reftec-api.refugeetech.iteamdev.svc.tutum.io:1337/proficiencies/0', {
    parentId: '@parentId'
  }, {})

  return {
    get (parentId) {
      return {}
      //return Proficiencies(parentId).$promise
    }
  }
})
