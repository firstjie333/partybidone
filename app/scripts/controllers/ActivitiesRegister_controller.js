/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location,$filter) {


//页面初始化
        //1)显示具体活动名称  :$scope.details_name
        //4)显示信息列表： 调用showMessage()
        //2)判断开始/结束按钮的状态   :$scope.activity_status
        //3)判断是否使能开始/结束按钮:

//details_name:显示具体活动名称
        $scope.details_name=localStorage.getItem('details')==null ? "" : JSON.parse(localStorage.getItem('details')).details_name;
//showMessage():显示当前页面活动列表
        showMessage();
//判断开始/结束按钮的状态：
        // 开始可用:活动状态为end
        // 结束可用:活动状态为begin
        // 开始不可用:活动状态为disabled

        //如果不存在正在进行的活动信息，状态为   开始可用end
        if(localStorage.getItem('begin_activity')==null)
        {
            $scope.this_activity_status='end';
        }
        else
        {
            //如果存在活动信息，并且正在进行的活动名称，等于当前页面的活动名称，状态为    结束可用begin
            if((JSON.parse(localStorage.getItem('begin_activity'))).activity_name==$scope.details_name)
            {
                $scope.this_activity_status='begin';
            }
            //否则  开始不可用disabled
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
        function showMessage()
        {
            var this_messages=[];
            var local_messages=JSON.parse(localStorage.getItem('messages')) || [];
            for(var i=0;i<local_messages.length;i++)
            {
                if(local_messages[i].activity_name==$scope.details_name)
                {
                    this_messages.push(local_messages[i]);
                }
            }
            $scope.Messages=this_messages.reverse();
            var count=this_messages.length;
//            var count=$scope.Messages.length;
            $scope.message_count="("+count+"人)";

        }

//SaveMessage():存储信息  （自定义）——————写在sms.js函数里了，因为需要获得相应的信息
//        function SaveMessage()
//        {
//            var mess = JSON.parse(localStorage.getItem('messages') || '[]');
//            var message =
//            {
//                "user_name": "张三",
//                "user_phone": "13699440780",
//                "activity_name":$scope.details_name
//            };
//            mess.push(message);
//            localStorage.setItem("messages",JSON.stringify(mess));
//        }



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
        //开启报名：将状态信息变为begin
        $scope.this_activity_status="begin";
        //存储开始报名的活动名称
        var the_begin_activity=
              {"activity_name":$scope.details_name
              };
        localStorage.removeItem("begin_activity");
        localStorage.setItem("begin_activity",JSON.stringify(the_begin_activity));
        //存储短信报名信息（定义在sms.js里面）
        saveMessage();
        //显示成功报名列表信息
        showMessage();
        //设置当前状态
        write_current_status("begin");


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

               //设置当前状态
               write_current_status("end");
           }
       }

       $scope.thisPageRefresh=function()
       {
           showMessage();
       }



    });
