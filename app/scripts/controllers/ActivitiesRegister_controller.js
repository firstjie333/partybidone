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
            $scope.message_count=" （"+ $scope.message_count;
            $scope.Messages=(JSON.parse(localStorage.getItem('messages'))).reverse();
        }

//SaveMessage():存储信息  （自定义）
        $scope.SaveMessage=function()
        {
            var mess = JSON.parse(localStorage.getItem('messages') || '[]');
            var message = {"user_name": "username", "user_phone": "userphone","activity_name":"activityname"};
            mess.push(message);
            localStorage.setItem("messages",JSON.stringify(mess));
        }

//getname:显示具体活动名称
       $scope.getname=JSON.parse(localStorage.getItem('details'));


//go_back()返回啊按钮单击事件
    $scope.go_back=function()
        {
            $location.path('/ActivitiesLists');
        }

//go_begin():开始报名按钮
    //开启报名
    //显示当前有有哪些报名信息
    //将当前活动的状态保存为begin（）
    //信息是倒叙显示
    $scope.go_begin=function()
    {
        $scope.activity_status="begin";
        //存储信息
        $scope.SaveMessage();
        //显示信息
        $scope.ShowMessage();

    }

//go_end():结束活动按钮
        //弹出确认对话框，
        //是，关闭；否：继续保持报名状态
        $scope.go_end=function()
        {
           if(confirm("确认要结束本次报名？"))
           {
               $scope.activity_status="end";
           }
       }




    });
