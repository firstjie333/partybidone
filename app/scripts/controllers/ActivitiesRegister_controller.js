/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {


/******页面初始化*******/
        //1)显示具体活动名称
        //4)显示信息列表：
        //2)判断开始/结束按钮的状态
        $scope.details_activityname=isKeyNULL('details_activity')?"":getLocal('details_activity').activity_name;
        showRegisterMessages();
        buttonStatus();


//判断并显示开始结束按钮
        function buttonStatus()
        {
            if(isKeyNULL('current_activity_status'))
            {   $scope.the_button_status = 'show_begin';}
            else
            {
                if (getLocalString('current_activity_status') == 'end' || getLocalString('current_activity_status') == 'end_activitycreate')
                {   $scope.the_button_status = 'show_begin';}
                else if (getLocalString('current_activity_status') == 'end_bidcreate')
                {   $scope.the_button_status = 'disabled_begin';}
                else
                {

                    if (getLocal('details_activity').activity_name == getLocal('current_activity').activity_name)
                    {   $scope.the_button_status = 'show_end'; }
                    else
                    {   $scope.the_button_status = 'disabled_begin'; }
                }
            }

        }

//显示已报名的信息列表和人数
        function showRegisterMessages()
        {
            var this_messages=[];
            var local_messages=getLocal('messages');
            for(var i=0;i<local_messages.length;i++)
            {
                if(local_messages[i].activity_name==$scope.details_activityname)
                {
                    this_messages.push(local_messages[i]);
                }
            }
            $scope.Messages=this_messages.reverse();
            $scope.Messages_count=this_messages.length;
        }


/*****************绑定的函数***********************/
//返回活动列表按钮
        $scope.go_activityLists=function()
        {
            $location.path('/ActivitiesLists');
        }

//开始报名按钮
    $scope.begin_register=function()
    {
        writeCurrentActivityStatus('begin'); //活动状态变为begin
        saveCurrentActivity($scope.details_activityname);
        buttonStatus();


        saveRegisterMessage(); //存储短信报名信息（定义在sms.js里面）
        showRegisterMessages();//显示成功报名列表信息
    }
        function saveCurrentActivity(activity_name)
        {
            var current_activity=new CurrentActivity(activity_name);
            setLocalString('current_activity',current_activity);//存储当前正在进行的活动
        }

//结束报名按钮
        $scope.end_register=function()
        {
           if(confirm("确认要结束本次报名？"))
           {
               removeLocal('current_activity')      //删除当前活动
               writeCurrentActivityStatus("end");   //设置当前活动状态
               $location.path('/BidLists');//跳转到竞价列表页面
           }
       }

//当前页面刷新，只用刷新信息列表和报名人数即可，直接调用 showMessage()函数
       $scope.thisPageRefresh=function()
       {
           showRegisterMessages();
       }


//竞价按钮
        $scope.go_bidLists=function()
        {
            $location.path('/BidLists');//跳转到竞价列表页面
        }
    });



