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



/**************初始化*******/
//初始化跳转判断
        if(localStorage.getItem('activities')==null)
        {
            $location.path('/CreateActivity');
        }
//将localstorage里面的activities数组取出，reverse（）方法实现倒叙输出
        $scope.Activities=localStorage.getItem('activities')==null ? [] : (JSON.parse(localStorage.getItem('activities'))).reverse();

/*****************初始化结束***********************/


 //go_create()：确认创建按钮
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }




//details(act_name):点击具体列表转到活动报名页面的ng-click
       //function：details
       //input：name（即html页面对应的所选活动名称）
       //会将活动名称参数传入localstorage：我取名为details（每次覆盖都没有问题）
       //会跳转到创建活动页面
        $scope.details=function(act_name)
        {

            var detail={"details_name":act_name};
            localStorage.removeItem("details");
            localStorage.setItem("details",JSON.stringify(detail));

            $location.path('/ActivitiesRegister');
        }

//showYellow()：正在报名的活动背景颜色变为黄色
        //返回值为一个字符串
        $scope.showYellow=function(activity_name)
        {
           if(localStorage.getItem('begin_activity')!=null && (JSON.parse(localStorage.getItem('begin_activity'))).activity_name==activity_name)
                {return "begin-yellow";}
           else
                {return null;}

        }



    });







