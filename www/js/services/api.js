angular.module('app').service('API', function () {
  var baseUrl = 'http://'

  if (window.location.href.indexOf('https') > -1) {
    // We are using ssl.
    baseUrl = 'https://'
  }

  if (window.location.hostname.indexOf('competency') > -1) {
    baseUrl += window.location.hostname.replace('app.', 'api.')
  } else {
    // Local dev fallback.
    baseUrl += 'localhost:1337'
  }

  console.log('Automatically configured baseUrl', baseUrl)

  return {
    BaseUrl: baseUrl
  }
})
