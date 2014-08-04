'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl:'views/ActivitiesLists.html',
            controller: 'ActivitiesListsController'
       })
      .when('/ActivitiesLists', {
        templateUrl: 'views/ActivitiesLists.html',
        controller: 'ActivitiesListsController'
      })
      .when('/ActivitiesRegister', {
         templateUrl: 'views/ActivitiesRegister.html',
         controller: 'ActivitiesRegisterController'
      })
      .when('/CreateActivity', {
         templateUrl: 'views/CreateActivity.html',
         controller: 'CreateActivityController'
        })
      .when('/BidLists', {
         templateUrl: 'views/BidLists.html',
         controller: 'BidListsController'
        })
      .when('/BidDetails', {
         templateUrl: 'views/BidDetails.html',
         controller: 'BidDetailsController'
      })
        .otherwise({
        redirectTo: '/'
      });
  });
