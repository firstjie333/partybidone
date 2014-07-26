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

        //var Act = JSON.parse(localStorage.getItem('activity'));   //取出本地数据库中的数据到activities中
        //Activities.unshift(activity);   // 按照倒叙将activity中的数据压栈到activities中
        //$scope.actcount='1111'
        //$scope.Activities = Act.unshift(activity);
        //$scope.actcount='1111';
      //  $scope.Activities=JSON.parse(localStorage.getItem('activities'));
        $scope.count=JSON.parse(localStorage.getItem('activities')).length;
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }
        //
        $scope.Activities=(JSON.parse(localStorage.getItem('activities'))).reverse();

       //ng-click某个具体的事件
       // 会将参数传入localstorage：我取名为details（每次覆盖都没有问题）
       //会跳转到创建活动页面

        $scope.details=function(name)
        {

            var detail={"name":name};
            localStorage.removeItem("details")
            localStorage.setItem("details",JSON.stringify(detail));
            $location.path('/ActivitiesRegister');
            //注意还应该传入一些参数信息哦,利用localstorage
        }
    });







