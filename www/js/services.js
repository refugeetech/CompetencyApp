angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('UserService', function ($resource) {
  'use strict'

  let User = $resource('http://localhost:1337/users/:userId', {
    userId: -1
  }, {
    update: { method: 'PUT' }
  })

  return {
    login (phoneNumber) {
      return User.update(phoneNumber)
    }
  }
})

