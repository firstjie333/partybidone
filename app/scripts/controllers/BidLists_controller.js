/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidListsController', function ($scope,$location) {

/************初始化***************/
        $scope.Bids=getBidOfActivityName()==[]?[]:getBidOfActivityName().reverse();
        buttonStatus();

        function  getBidOfActivityName()
        {
            var this_bids=[];
            var bids=getLocal('bids');
            for(var i=0;i<bids.length;i++)
            {
                if(bids[i].activity_name==getLocal('details_activity').activity_name)
                {
                    this_bids.push(bids[i]);
                }
            }
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
                }
            );
            //当前是否有竞价正在进行（如果有竞价正在进行不能开始）
            var is_begin_bid =isKeyNULL('current_bid');
            $scope.the_button_status= (is_register && is_begin_bid ) ? "show_begin" : "disabled_begin";
        }



        $scope.go_back_activityLists=function()
        {
            $location.path('//ActivitiesLists');
        }

        $scope.create_bidDetails=function()
        {

            var activity_name=getLocal('details_activity').activity_name;//获得当前活动名称
            var bid_id=lengthOfActivityBids(activity_name)+1;
            saveBid(activity_name,bid_id);//存储竞价
            saveDetailsBid(activity_name,bid_id);//存储跳转的竞价信息
            saveCurrentBid(activity_name,bid_id);//存储当前竞价信息
            //活动状态变为end_bidcreate
            writeCurrentActivityStatus('end_bidcreate');
            //竞价状态变为begin_bid
            writeCurrentBidStatus('begin_bid');
            //竞价列表页面的开始按钮状态变为灰色不可点击
            //竞价列表和活动列表的底色为黄色


            //页面跳转
             $location.path('/BidDetails');
        }

        $scope.go_bidDetails=function(activity_name,bid_id)
        {
            saveDetailsBid(activity_name,bid_id);//存储跳转的竞价信息
            $location.path('/BidDetails');
        }



        function saveDetailsBid(activity_name,bid_id)
        {
            var details_bid=new DetailsBid(activity_name,bid_id);
            setLocalString('details_bid',details_bid);
        }
        function saveCurrentBid(activity_name,bid_id)
        {
            var details_bid=new CurrentBid(activity_name,bid_id)
            setLocalString('current_bid',details_bid);
        }


//是否显示黄色背景色
        $scope.showYellow=function(activity_name,bid_id)
        {
            if(!isKeyNULL('current_bid')&&(getLocal('current_bid').activity_name) == activity_name  &&  (getLocal('current_bid').bid_id) == bid_id)
               {return "begin-yellow";}
            else
               {return null; }
        }


        $scope.go_register=function()
        {
            $location.path('/ActivitiesRegister');
        }

    });