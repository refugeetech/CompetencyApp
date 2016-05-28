angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('phone', {
      url: '/phone',
      templateUrl: 'templates/phone.html',
      controller: 'phoneCtrl'
    })

    .state('user', {
      url: '/user/:userId',
      templateUrl: 'templates/userProfile.html',
      controller: 'userProfileCtrl'
    })

    .state('user.workAreas', {
      url: '/work-areas',
      templateUrl: 'templates/workAreas.html',
      controller: 'workAreasCtrl'
    })

    .state('user.work', {
      url: '/work',
      templateUrl: 'templates/work.html',
      controller: 'workCtrl'
    })

    .state('user.thankYou', {
      url: '/thanks',
      templateUrl: 'templates/thankYou.html',
      controller: 'thankYouCtrl'
    })

    .state('user.occupations', {
      url: '/occupations',
      templateUrl: 'templates/occupations.html',
      controller: 'occupationsCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/phone');

})
