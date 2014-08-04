/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {


/******页面初始化*******/
        //1)显示具体活动名称  :$scope.details_name
        //4)显示信息列表： 调用showMessage()
        //2)判断开始/结束按钮的状态   :$scope.activity_status
        //3)判断是否使能开始/结束按钮:


        $scope.details_name=isKeyNULL('details')?"":getLocalString('details').details_name;
        showMessage();
//判断开始/结束按钮的状态：
        // 开始可用:活动状态为end  结束可用:活动状态为begin   开始不可用:活动状态为disabled
        if(isKeyNULL('begin_activity'))
            {
                $scope.this_activity_status='end';
            }
        else
        {
            //如果存在活动信息，并且正在进行的活动名称，等于当前页面的活动名称，状态为    结束可用begin
            if(getLocalString('begin_activity').activity_name==$scope.details_name)
            {
                $scope.this_activity_status='begin';
            }
            //否则  开始不可用disabled
            else
            {
                $scope.this_activity_status='disabled';
            }
        }
/*****************绑定的函数***********************/
//showMessage():显示信息 （自定义）
        function showMessage()
        {
            var this_messages=[];
            var local_messages=getLocalObject('messages');
            for(var i=0;i<local_messages.length;i++)
            {
                if(local_messages[i].activity_name==$scope.details_name)
                {
                    this_messages.push(local_messages[i]);
                }
            }
            $scope.Messages=this_messages.reverse();
            var count=this_messages.length;
            $scope.message_count=count;
        }



//go_back()返回按钮单击事件
        $scope.go_back=function()
        {
            $location.path('/ActivitiesLists');
        }

//go_begin():开始报名按钮
    //开启报名：将状态信息变为begin
    //存储当前这个活动的信息到localstorage：取名为begin_activity
    //显示成功报名的报名列表（信息的倒叙显示的）ShowMessage（）
    $scope.go_begin=function()
    {
        $scope.this_activity_status="begin";//开启报名：将状态信息变为begin
        var the_begin_activity=
              {   "activity_name":$scope.details_name   };//存储开始报名的活动名称
        setLocalString('begin_activity',the_begin_activity);
        saveMessage(); //存储短信报名信息（定义在sms.js里面）
        showMessage();//显示成功报名列表信息
        write_current_status("begin"); //设置当前状态
    }

//go_end():结束活动按钮
        $scope.go_end=function()
        {
           if(confirm("确认要结束本次报名？"))
           {
               localStorage.removeItem("begin_activity");
               $scope.this_activity_status="end";
               write_current_status("end");   //设置当前状态
               $location.path('/BidLists');//跳转到竞价列表页面
           }
       }

//当前页面刷新，只用刷新信息列表和报名人数即可，直接调用 showMessage()函数
       $scope.thisPageRefresh=function()
       {
           showMessage();
       }

    });
