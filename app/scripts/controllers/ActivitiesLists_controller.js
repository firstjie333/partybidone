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

        //$scope.count=;//准备显示一共有多少活动
         //$scope.go_back=
    });

   $scope.Activities = JSON.parse(localStorage.getItem('activities'))||[]    //取出数据到list中


/*这个三写在创建活动页面上面的*/
//var activity = {"activity":$scope.change,"messages":[]};   //将txt输入文档中的内容添加到变量activity中
var Activities = JSON.parse(localStorage.getItem('activities')) || [];   //取出本地数据库中的数据到activities中
Activities.unshift(activity);   // 按照倒叙将activity中的数据压栈到activities中
//localStorage.setItem("activities", JSON.stringify(activities));   //再将activities中的数据储存到本地数据库中

