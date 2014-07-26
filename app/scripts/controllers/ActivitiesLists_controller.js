/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */




angular.module('angularApp')
    .controller('ActivitiesListsController', function ($scope,$location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        //var Act = JSON.parse(localStorage.getItem('activity'));   //取出本地数据库中的数据到activities中
        //Activities.unshift(activity);   // 按照倒叙将activity中的数据压栈到activities中
        //$scope.actcount='1111'
        //$scope.Activities = Act.unshift(activity);
        //$scope.actcount='1111';
      //  $scope.Activities=JSON.parse(localStorage.getItem('activities'));
        $scope.count='5';
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }
    });







