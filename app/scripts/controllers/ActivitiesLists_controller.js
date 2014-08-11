/*** Created by fengjie on 14-7-22.*/
'use strict';


angular.module('angularApp')
    .controller('ActivitiesListsController', function ($scope,$location) {


/**************初始化*******/
        if(isKeyNULL('activities'))
        {
            $location.path('/CreateActivity');
        }


        $scope.Activities=getLocal("activities").reverse();
        buttonStatus();


/************绑定的函数*****************/
//创建活动的按钮状态
        function buttonStatus()
        {
           $scope.the_button_status= Bid.readCurrentBidStatus()=="begin_bid" ? "disabled" : "show";
        }


//创建新的活动
        $scope.createActivity=function()
        {
            $location.path('/CreateActivity');
        }


//跳转活动报名页面
        $scope.goRegister=function(name)
        {
            DetailsActivity.saveDetailsActivity(name);
            $location.path('/ActivitiesRegister');//跳转创建活动报名页面
        }

//是否显示黄色背景色
        $scope.showYellow=function(activity_name)
        {
            if (  !isKeyNULL('current_activity')   &&   (getLocal('current_activity').activity_name) == activity_name)
                 { return "begin-yellow";}
            else if(isKeyNULL('current_activity')  &&  !isKeyNULL('current_bid')  && (getLocal('current_bid').activity_name) == activity_name )
                 {  return "begin-yellow";}
            else
                 { return null; }
        }
    });







