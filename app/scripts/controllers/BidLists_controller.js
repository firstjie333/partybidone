/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidListsController', function ($scope,$location) {

/************初始化***************/
        $scope.Bids=getBidOfActivityName()==[]?[]:getBidOfActivityName().reverse();
        buttonStatus();

//根据活动名称获得当前活动的竞价列表
        function  getBidOfActivityName()
        {
            var bids=getLocal('bids');
            var this_bids= _.filter(bids,function(bid)
            {
               return  bid.activity_name==getLocal('details_activity').activity_name;
            });
            return this_bids;
        }


        function buttonStatus()
        {
            //当前页面所对应的活动是否有报名信息(需要报名以后才能竞价 )
            var activity_name=getLocal('details_activity').activity_name;
            var register_messages=getLocal('messages');
            var is_register = _(register_messages).some(function(register)
                {
                   return  register.activity_name==activity_name;
                });
            var is_begin_bid =isKeyNULL('current_bid');         //当前是否有竞价正在进行（如果有竞价正在进行不能开始）
            var is_begin_activity=isKeyNULL('current_activity');//当前是否有活动正在进行（如果有活动正在进行则不能开始）
            $scope.the_button_status= (is_register && is_begin_bid && is_begin_activity ) ? "show_begin" : "disabled_begin";
        }


/**********绑定的函数****************/
        $scope.goBackActivityLists=function()
        {
            $location.path('//ActivitiesLists');
        }

        $scope.createBidDetails=function()
        {

            var activity_name=getLocal('details_activity').activity_name;//获得当前活动名称
            var new_bid=Bid.saveBid(activity_name);                      //存储竞价

            Activity.writeCurrentActivityStatus('end_bidcreate');        //活动状态变为end_bidcreate
            Bid.writeCurrentBidStatus('begin_bid');                      //竞价状态变为begin_bid

            var current_bid=new CurrentBid(activity_name,new_bid.bid_id);//更新当前竞价信息
            current_bid.updateCurrentBid(current_bid.activity_name,current_bid.bid_id);

            $scope.goBidDetails(activity_name,new_bid.bid_id);//更新要跳转的页面竞价信息，并跳转
//            var details_bid=new DetailsBid(activity_name,new_bid.bid_id);
//            details_bid.updateDetailsBid(details_bid.activity_name,details_bid.bid_id);
//            $location.path('/BidDetails');//页面跳转
        }


        $scope.goBidDetails=function(activity_name,bid_id)
        {
            var details_bid=new DetailsBid(activity_name,bid_id);
            details_bid.updateDetailsBid(details_bid.activity_name,details_bid.bid_id);
            $location.path('/BidDetails');
        }






//是否显示黄色背景色
        $scope.showYellow=function(activity_name,bid_id)
        {
            if(!isKeyNULL('current_bid')&&(getLocal('current_bid').activity_name) == activity_name  &&  (getLocal('current_bid').bid_id) == bid_id)
               {return "begin-yellow";}
            else
               {return null; }
        }

//跳到报名页面
        $scope.goRegister=function()
        {
            $location.path('/ActivitiesRegister');
        }

    });