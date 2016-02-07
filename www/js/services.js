angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('UserService', function ($resource) {
  'use strict'

  let User = $resource('http://api.competency.se/users/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' }
  })

  let user

  return {
    create: phoneNumber => {
      user = new User()
      user.phoneNumber = phoneNumber
      return user
        .$save()
        .then(data => {
          user.id = data.userId
          return Promise.resolve(data.userId)
        })
    },

    update: data => {
      if (user) {
        angular.extend(user, data)
      } else {
        user = data
      }

      console.log('user', user);


      return User
        .update({ id: user.id }, user)
        .$promise
        .then(_ => Promise.resolve())
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
