/**
 * Created by fengjie on 14-7-22.
 */
'use strict';


angular.module('angularApp')
    .controller('ActivitiesListsController', function ($scope,$location) {



/**************初始化*******/
//初始化跳转判断
        if(isKeyNULL('activities'))
        {
            $location.path('/CreateActivity');
        }

        var acts=getLocalObject("activities");
        console.log(acts);
        $scope.Activities=acts.reverse();



/************绑定的函数*****************/
 //go_create()：确认创建按钮
        $scope.go_create=function()
        {
            $location.path('/CreateActivity');
        }

//details(act_name):点击具体列表转到活动报名页面的
       //input：name（即html页面对应的所选活动名称）
        $scope.details=function(act_name)
        {
            var detail={"details_name":act_name};//设置value
            setLocalString("details",detail);//调用函数
            $location.path('/ActivitiesRegister');//跳转创建活动页面
        }

//showYellow()：正在报名的活动背景颜色变为黄色
        $scope.showYellow=function(activity_name)
        {
            if ((!isKeyNULL('begin_activity')) && ((getLocalString('begin_activity').activity_name) == activity_name))
                 { return "begin-yellow";}
            else
                 { return null; }
        }


    });







