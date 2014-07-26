/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('MainController', function ($scope,$location) {


     // $scope.count=JSON.parse(localStorage.getItem('activities'))||[];

            if(JSON.parse(localStorage.getItem('activities')).length!=null)
           {
               $location.path('/ActivitiesLists');
           }
           else
           {
               $location.path('/CreateActivity');
           }

    });