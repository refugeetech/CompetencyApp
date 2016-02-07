angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('UserService', function ($resource) {
  'use strict'

  let User = $resource('http://reftec-api.refugeetech.iteamdev.svc.tutum.io:1337/users/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' }
  })

  return {
    login (phoneNumber) {
      return User
        .update({
          id: phoneNumber
        })
        .$promise
    }
  }
})

.service('ProficiencyService', function ($resource) {
  'use strict'

  let Proficiencies = $resource('http://reftec-api.refugeetech.iteamdev.svc.tutum.io:1337/proficiencies/0', {
    parentId: '@parentId'
  }, {})

  return {
    get (parentId) {
      return {}
      //return Proficiencies(parentId).$promise
    }
  }
})
