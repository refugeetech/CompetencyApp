angular.module('app').service('API', function () {
  var baseUrl = 'http://'
  var port = window.location.port
  var hostname = window.location.hostname

  if (port === 443) {
    baseUrl = 'https://'
  }

  if (hostname.indexOf('competency') > -1) {
    baseUrl += hostname.replace('app.', '')
  } else {
    baseUrl += 'localhost:1337'
  }

  console.log('Automatically configured baseUrl', baseUrl)

  return {
    BaseUrl: baseUrl
  }
})
