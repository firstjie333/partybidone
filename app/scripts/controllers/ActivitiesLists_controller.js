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
        //  $scope.Activities=JSON.parse(localStorage.getItem('activities'));


//初始化跳转判断
        if(localStorage.getItem('activities')==null)
        {
            $location.path('/CreateActivity');
        }



 //函数：go_create()：确认创建按钮
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }


//将localstorage里面的activities数组取出，reverse（）方法实现倒叙输出
        $scope.Activities=(JSON.parse(localStorage.getItem('activities'))).reverse();


//ng-click：对应details函数
       //function：details
       //input：name（即html页面对应的所选活动名称）
       // 会将参数传入localstorage：我取名为details（每次覆盖都没有问题）
       //会跳转到创建活动页面
        $scope.details=function(act_name)
        {

            var detail={"details_name":act_name};
            localStorage.removeItem("details");
            localStorage.setItem("details",JSON.stringify(detail));
            $location.path('/ActivitiesRegister');
            //注意还应该传入一些参数信息哦,利用localstorage
        }

//showYellow()：正在报名的活动，背景颜色变为黄色
        $scope.showYellow=function(activity_name)
        {
           if(localStorage.getItem('begin_activity')!=null&&(JSON.parse(localStorage.getItem('begin_activity'))).activity_name==activity_name)
                {return "begin-yellow";}
           else
                {return null;}

        }



    });







