angular.module('app.services', ['ngResource'])

.service('UserService', function ($resource, API) {
  var User = $resource(API.BaseUrl + '/users/:userId', {
    userId: '@userId'
  }, {
    update: { method: 'PUT' },
    get: { method: 'GET' }
  })

  var self = this

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

    get: function (query) {
      return new User().$get(query)
    }
  }
})

.service('ProficiencyService', function ($resource, API) {
  return $resource(
    API.BaseUrl + '/proficiencies/:id',
    { id: '@id' },
    {'query': { method: 'GET', isArray: true }}
  )
})

.service('OccupationService', function ($resource, API) {
  return $resource(
    API.BaseUrl + '/occupations',
    {'query': { method: 'GET', isArray: true }}
  )
})

.service('UserCountService', function ($resource, API) {
  return $resource(
    API.BaseUrl + '/users/count',
    {'query': { method: 'GET', isArray: false }}
  )
})

.service('AuthService', function ($window, API) {
  return {
    linkedIn: function () {
      $window.location = API.BaseUrl + '/auth/linkedin'
    }
  }
})

.factory('cities', [function () {
  return [
    'Stockholm, ',
    'Göteborg, ',
    'Malmö, ',
    'Uppsala, ',
    'Linköping, ',
    'Västerås, ',
    'Örebro, ',
    'Helsingborg, Skåne',
    'Norrköping, Östergötland',
    'Jönköping, Jönköping',
    'Umeå, Västerbotten',
    'Lund, Skåne',
    'Borås, Västra Götaland',
    'Huddinge, Stockholm',
    'Eskilstuna, Södermanland',
    'Gävle, Gävleborg',
    'Nacka, Stockholm',
    'Sundsvall, Västernorrland',
    'Halmstad, Halland',
    'Södertälje, Stockholm',
    'Botkyrka, Stockholm',
    'Karlstad, Värmland',
    'Växjö, Kronoberg',
    'Haninge, Stockholm',
    'Kristianstad, Skåne',
    'Kungsbacka, Halland',
    'Solna, Stockholm',
    'Luleå, Norrbotten',
    'Järfälla, Stockholm',
    'Skellefteå, Västerbotten',
    'Sollentuna, Stockholm',
    'Täby, Stockholm',
    'Kalmar, Kalmar',
    'Karlskrona, Blekinge',
    'Mölndal, Västra Götaland',
    'Östersund,Jämtland',
    'Varberg, Halland',
    'Norrtälje, Stockholm',
    'Gotland, Gotland',
    'Trollhättan,Västra Götaland',
    'Falu, Dalarna',
    'Örnsköldsvik, Västernorrland',
    'Nyköping, Södermanland',
    'Uddevalla, Västra Götaland',
    'Skövde, Västra Götaland',
    'Hässleholm, Skåne',
    'Borlänge, Dalarna',
    'Lidingö, Stockholm',
    'Tyresö, Stockholm',
    'Sundbyberg, Stockholm',
    'Sigtuna, Stockholm',
    'Landskrona, Skåne',
    'Trelleborg, Skåne',
    'Falkenberg, Halland',
    'Motala, Östergötland',
    'Kungälv, Västra Götaland',
    'Upplands Väsby, Stockholm',
    'Österåker, Stockholm',
    'Enköping, Uppsala',
    'Piteå, Norrbotten',
    'Värmdö, Stockholm',
    'Ängelholm, Skåne',
    'Lerum, Västra Götaland',
    'Alingså, Västra Götaland',
    'Lidköping, Västra Götaland',
    'Vänersborg, Västra Götaland',
    'Sandviken, Gävleborg',
    'Partille, Västra Götaland',
    'Hudiksvall, Gävleborg',
    'Härryda, Västra Götaland',
    'Västervik,Kalmar',
    'Vellinge, Skåne',
    'Strängnä, Södermanland',
    'Mark, Västra Götaland',
    'Värnamo, Jönköping',
    'Katrineholm, Södermanland',
    'Falköping, Västra Götaland',
    'Eslöv, Skåne',
    'Danderyd, Stockholm',
    'Vallentuna, Stockholm',
    'Karlshamn, Blekinge',
    'Nässjö, Jönköping',
    'Karlskoga, Örebro',
    'Kävlinge, Skåne',
    'Gislaved, Jönköping',
    'Ystad, Skåne',
    'Ale, Västra Götaland',
    'Ronneby, Blekinge',
    'Boden, Norrbotten',
    'Ljungby, Kronoberg',
    'Nynäshamn, Stockholm',
    'Ekerö, Stockholm',
    'Vetlanda, Jönköping',
    'Mjölby, Östergötland',
    'Bollnä, Gävleborg',
    'Oskarshamn, Kalmar',
    'Ludvika, Dalarna',
    'Arvika, Värmland',
    'Upplands-Bro, Stockholm',
    'Söderhamn, Gävleborg',
    'Höganä, Skåne',
    'Köping, Västmanland',
    'Stenungsund, Västra Götaland',
    'Härnösand, Västernorrland',
    'Kristinehamn, Värmland',
    'Laholm, Halland',
    'Mariestad, Västra Götaland',
    'Lindesberg, Örebro',
    'Ulricehamn, Västra Götaland',
    'Lomma, Skåne',
    'Kiruna, Norrbotten',
    'Staffanstorp, Skåne',
    'Avesta, Dalarna',
    'Sala, Västmanland',
    'Östhammar, Uppsala',
    'Finspång, Östergötland',
    'Kumla, Örebro',
    'Tierp, Uppsala',
    'Svedala, Skåne',
    'Håbo, Uppsala',
    'Mora, Dalarna',
    'Sollefteå, Västernorrland',
    'Nybro, Kalmar',
    'Alvesta, Kronoberg',
    'Simrishamn, Skåne',
    'Ljusdal, Gävleborg',
    'Skara, Västra Götaland',
    'Tranå, Jönköping',
    'Sjöbo, Skåne',
    'Kramfor, Västernorrland',
    'Gällivare, Norrbotten',
    'Timrå, Västernorrland',
    'Burlöv, Skåne',
    'Sölvesborg, Blekinge',
    'Klippan, Skåne',
    'Knivsta, Uppsala',
    'Eksjö, Jönköping',
    'Flen, Södermanland',
    'Salem, Stockholm',
    'Kalix, Norrbotten',
    'Älmhult, Kronoberg',
    'Höör, Skåne',
    'Vara, Västra Götaland',
    'Hallstahammar, Västmanland',
    'Hallsberg, Örebro',
    'Hammarö, Värmland',
    'Vimmerby, Kalmar',
    'Säffle, Värmland',
    'Leksand, Dalarna',
    'Tjörn, Västra Götaland',
    'Hedemora, Dalarna',
    'Åstorp, Skåne',
    'Skurup, Skåne',
    'Hörby, Skåne',
    'Orust, Västra Götaland',
    'Bjuv, Skåne',
    'Krokom, Jämtland',
    'Mörbylånga, Kalmar',
    'Lysekil, Västra Götaland',
    'Båstad, Skåne',
    'Söderköping, Östergötland',
    'Östra Göinge, Skåne',
    'Hultsfred, Kalmar',
    'Arboga, Västmanland',
    'Svalöv, Skåne',
    'Heby, Uppsala',
    'Vaggeryd, Jönköping',
    'Fagersta, Västmanland',
    'Sunne, Värmland',
    'Lilla Edet, Västra Götaland',
    'Olofström, Blekinge',
    'Götene, Västra Götaland',
    'Mönsterå, Kalmar',
    'Tomelilla, Skåne',
    'Osby, Skåne',
    'Strömstad, Västra Götaland',
    'Öckerö, Västra Götaland',
    'Tidaholm, Västra Götaland',
    'Åmål, Västra Götaland',
    'Bromölla, Skåne',
    'Tanum, Västra Götaland',
    'Tingsryd, Kronoberg',
    'Lycksele, Västerbotten',
    'Trosa, Södermanland',
    'Torsby, Värmland',
    'Hagfor, Värmland',
    'Kil, Värmland',
    'Strömsund, Jämtland',
    'Oxelösund, Södermanland',
    'Tranemo, Västra Götaland',
    'Åtvidaberg, Östergötland',
    'Ovanåker, Gävleborg',
    'Vaxholm, Stockholm',
    'Forshaga, Värmland',
    'Habo, Jönköping',
    'Sävsjö, Jönköping',
    'Vårgårda, Västra Götaland',
    'Askersund, Örebro',
    'Säter, Dalarna',
    'Tibro, Västra Götaland',
    'Smedjebacken, Dalarna',
    'Rättvik, Dalarna',
    'Borgholm, Kalmar',
    'Åre, Jämtland',
    'Gnesta, Södermanland',
    'Filipstad, Värmland',
    'Hylte, Halland',
    'Svenljunga, Västra Götaland',
    'Nora, Örebro',
    'Härjedalen, Jämtland',
    'Munkedal, Västra Götaland',
    'Nykvarn, Stockholm',
    'Gagnef, Dalarna',
    'Malung-Sälen, Dalarna',
    'Surahammar, Västmanland',
    'Årjäng, Värmland',
    'Haparanda, Norrbotten',
    'Örkelljunga, Skåne',
    'Kinda, Östergötland',
    'Markaryd, Kronoberg',
    'Bengtsfor, Västra Götaland',
    'Degerfor, Örebro',
    'Gnosjö, Jönköping',
    'Ånge, Västernorrland',
    'Nordanstig, Gävleborg',
    'Hofor, Gävleborg',
    'Herrljunga, Västra Götaland',
    'Uppvidinge, Kronoberg',
    'Töreboda, Västra Götaland',
    'Älvkarleby, Uppsala',
    'Mellerud, Västra Götaland',
    'Emmaboda, Kalmar',
    'Sotenä, Västra Götaland',
    'Hjo, Västra Götaland',
    'Vingåker, Södermanland',
    'Grum, Värmland',
    'Bollebygd, Västra Götaland',
    'Vännä, Västerbotten',
    'Lessebo, Kronoberg',
    'Eda, Värmland',
    'Kungsör, Västmanland',
    'Älvsbyn, Norrbotten',
    'Valdemarsvik, Östergötland',
    'Lekeberg, Örebro',
    'Vadstena, Östergötland',
    'Perstorp, Skåne',
    'Mullsjö, Jönköping',
    'Nordmaling, Västerbotten',
    'Älvdalen, Dalarna',
    'Berg, Jämtland',
    'Hällefor, Örebro',
    'Torså, Kalmar',
    'Vilhelmina, Västerbotten',
    'Robertsfor, Västerbotten',
    'Karlsborg, Västra Götaland',
    'Orsa, Dalarna',
    'Vansbro, Dalarna',
    'Aneby, Jönköping',
    'Färgelanda, Västra Götaland',
    'Arvidsjaur, Norrbotten',
    'Bräcke, Jämtland',
    'Pajala, Norrbotten',
    'Storuman, Västerbotten',
    'Högsby, Kalmar',
    'Ockelbo, Gävleborg',
    'Norberg, Västmanland',
    'Laxå, Örebro',
    'Grästorp, Västra Götaland',
    'Essunga, Västra Götaland',
    'Ragunda, Jämtland',
    'Vindeln, Västerbotten',
    'Boxholm, Östergötland',
    'Ödeshög, Östergötland',
    'Gullspång, Västra Götaland',
    'Jokkmokk, Norrbotten',
    'Ljusnarsberg, Örebro',
    'Dals-Ed, Västra Götaland',
    'Övertorneå, Norrbotten',
    'Skinnskatteberg, Västmanland',
    'Norsjö, Västerbotten',
    'Storfor, Värmland',
    'Munkfor, Värmland',
    'Ydre, Östergötland',
    'Överkalix, Norrbotten',
    'Malå, Västerbotten',
    'Arjeplog, Norrbotten',
    'Åsele, Västerbotten',
    'Dorotea, Västerbotten',
    'Sorsele, Västerbotten',
    'Bjurholm, Västerbotten'
  ].map(function (str) {
    return str.split(', ')
  }).sort(function (a, b) {
    return a[1] - b[1]
  }).map(function (arr){
    return arr.join(', ')
  })
}])
