/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {

//ShowMessage():显示信息 （自定义）
        $scope.ShowMessage=function()
        {
            $scope.message_count=localStorage.getItem('messages')==null ? 0 : JSON.parse(localStorage.getItem('activities')).length+"人）";
            $scope.message_count=" （"+ $scope.message_count;//注：不点击开始按钮时，希望“（人）”都不显示，所以在这里做了字符串处理
            $scope.Messages=(JSON.parse(localStorage.getItem('messages'))).reverse();
        }

//SaveMessage():存储信息  （自定义）
        $scope.SaveMessage=function()
        {
            var mess = JSON.parse(localStorage.getItem('messages') || '[]');
            var message =
            {
                "user_name": "username",
                "user_phone": "userphone",
                "activity_name":"activityname"
            };
            mess.push(message);
            localStorage.setItem("messages",JSON.stringify(mess));
        }

//getname:显示具体活动名称
       $scope.getname=JSON.parse(localStorage.getItem('details'));


//go_back()返回按钮单击事件
    $scope.go_back=function()
        {
            $location.path('/ActivitiesLists');
        }

//go_begin():开始报名按钮
    //开启报名：将状态信息变为begin
    //存储当前这个活动的信息到localstorage：取名为begin_activity
    //存储报名信息：SaveMessage（）
    //显示成功报名的报名列表（信息的倒叙显示的）ShowMessage（）
    $scope.go_begin=function()
    {
        $scope.activity_status="begin";
        //存储开始报名的活动名称
        var the_begin_activity={"activity_name":($scope.getname).details_name};
        localStorage.removeItem("begin_activity");
        localStorage.setItem("begin_activity",JSON.stringify(the_begin_activity));
        //存储短信报名信息
        $scope.SaveMessage();
        //显示成功报名列表信息
        $scope.ShowMessage();

    }

//go_end():结束活动按钮
        //弹出确认对话框，
        //是：清楚localstorage：begin_activity;改变状态变为end
        //否：继续保持报名状态
        $scope.go_end=function()
        {
           if(confirm("确认要结束本次报名？"))
           {
               localStorage.removeItem("begin_activity");
               $scope.activity_status="end";
           }
       }

//
       $scope.disabled=function()
       {

           return localStorage.getItem('begin_activity')==null ? 'false' : 'true';
       }



    });
