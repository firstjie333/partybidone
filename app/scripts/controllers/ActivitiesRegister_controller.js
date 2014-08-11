/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {


/******页面初始化*******/
        $scope.details_activityname=isKeyNULL('details_activity')? "" : getLocal('details_activity').activity_name;
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
                             {   $scope.the_button_status = 'disabled_begin';}
                    }
            }

        }

//显示已报名的信息列表和人数
        function showRegisterMessages()
        {
            var messages=getLocal('messages');
            var this_page_messages= _.filter(messages,function(message)
                {
                    return message.activity_name==$scope.details_activityname;
                });
            $scope.Messages= this_page_messages==[] ? [] : this_page_messages.reverse();
            $scope.Messages_count=this_page_messages==[] ? 0 : this_page_messages.length;
        }



/*****************绑定的函数***********************/
//返回活动列表按钮
        $scope.goActivityLists=function()
        {
            $location.path('/ActivitiesLists');
        }

//开始报名按钮
    $scope.beginRegister=function()
    {
        Activity.writeCurrentActivityStatus('begin'); //活动状态变为begin
        CurrentActivity.saveCurrentActivity($scope.details_activityname);


        showRegisterMessages();//显示成功报名列表信息
        buttonStatus();
    }



//结束报名按钮
        $scope.endRegister=function()
        {
           if(confirm("确认要结束本次报名？"))
           {
               removeLocal('current_activity')      //删除当前活动
               Activity.writeCurrentActivityStatus("end");   //设置当前活动状态
               $location.path('/BidLists');//跳转到竞价列表页面
           }
       }

//当前页面刷新
       $scope.thisPageRefresh=function()
       {
           showRegisterMessages();
       }


//竞价按钮跳转
        $scope.goBidLists=function()
        {
            $location.path('/BidLists');//跳转到竞价列表页面
        }
    });



