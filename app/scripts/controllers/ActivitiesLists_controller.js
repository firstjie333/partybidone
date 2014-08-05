/*** Created by fengjie on 14-7-22.*/
'use strict';


angular.module('angularApp')
    .controller('ActivitiesListsController', function ($scope,$location) {


/**************初始化*******/
        if(isKeyNULL('activities'))
        {
            $location.path('/CreateActivity');
        }

        var acts=getLocal("activities");
        $scope.Activities=acts.reverse();


/************绑定的函数*****************/
//创建新的活动
        $scope.createActivity=function()
        {
            $location.path('/CreateActivity');
        }


//跳转活动报名页面
        $scope.go_register=function(name)
        {
            var detail=new DetailsActivity(name);//创建当前活动报名页面的对象
            setLocalString('details_activity',detail);
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







