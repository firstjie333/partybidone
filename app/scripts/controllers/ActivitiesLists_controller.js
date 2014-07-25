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
    .controller('ActivitiesListsController', function ($scope) {
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
        $scope.count='选人';//设置为活动列表的个数
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }

        $socpe.Activities=JSON.parse(localStorage.getItem('activities'));
    });







