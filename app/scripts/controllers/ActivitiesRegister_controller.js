/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location,$filter) {

// 活动状态
//     $scope.activity_status=localStorage.getItem('messages')==null ? 'end':'begin';
//页面初始化
        //1)显示具体活动名称  :$scope.details_name
        //2)判断开始/结束按钮的状态   :$scope.activity_status
        //3)判断是否使能开始/结束按钮   :
        //4)显示信息列表： 调用ShowMessage()
//getname:显示具体活动名称
        $scope.details_name=JSON.parse(localStorage.getItem('details')).details_name || "";
//判断开始结束按钮的状态：
// 开始可用:活动状态为end
// 结束可用:活动状态为begin
// 开始不可用:活动状态为disabled
        if(localStorage.getItem('begin_activity')==null)
        {
            $scope.this_activity_status='end';
        }
        else
        {
            if((JSON.parse(localStorage.getItem('begin_activity'))).activity_name==$scope.details_name)
            {
                $scope.this_activity_status='begin';
            }
            else
            {
                $scope.this_activity_status='disabled';
            }
        }


//isDisabled():使能开始/结束按钮
        //方法是：将当前页面的活动名称  与   localstorage里面的begin_activity的活动名称做对比
        // 相同：不使能开始结束按钮；不相同：按钮的标签的开始，并且使能开始按钮
        $scope.isDisabled=function()
        {
            //没有开始的活动，直接返回false；
            if(localStorage.getItem('begin_activity')==null)
            {return false;}
            else
            {
                if((JSON.parse(localStorage.getItem('begin_activity'))).details_name==$scope.details_name)
                {
                    return false;
                }
                else
                {return true;}
            }
        }

//ShowMessage():显示信息 （自定义）
        function ShowMessage()
        {
            var this_messages=JSON.parse(localStorage.getItem('messages')) || [];
            var count=JSON.parse(localStorage.getItem('messages')).length;
            $scope.message_count="("+count+"人)";
            $scope.Messages=(JSON.parse(localStorage.getItem('messages'))).reverse();
        }

//SaveMessage():存储信息  （自定义）
        function SaveMessage()
        {
            var mess = JSON.parse(localStorage.getItem('messages') || '[]');
            var message =
            {
                "user_name": "张三",
                "user_phone": "13699440780",
                "activity_name":$scope.this_activity_status
            };
            mess.push(message);
            localStorage.setItem("messages",JSON.stringify(mess));
        }



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
        $scope.this_activity_status="begin";
        //存储开始报名的活动名称
        var the_begin_activity=
              {"activity_name":$scope.details_name,
               "activity_status":$scope.this_activity_status
              };
        localStorage.removeItem("begin_activity");
        localStorage.setItem("begin_activity",JSON.stringify(the_begin_activity));
        //存储短信报名信息
        SaveMessage();
        //显示成功报名列表信息
        ShowMessage();

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
               $scope.this_activity_status="end";
           }
       }




    });
