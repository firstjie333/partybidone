/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidDetailsController', function ($scope,$location) {

/********初始化***********************/
        $scope.the_bid_id=getLocal('details_bid').bid_id;
        buttonStatus();
        showBidMessages();

//结束按钮状态
        function  buttonStatus()
        {
            switch(Bid.readCurrentBidStatus())
            {
                case "begin_bid":
                {
                       var details_activity_name= getLocal('details_activity').activity_name;
                       var details_bid_id=getLocal('details_bid').bid_id;
                       $scope.the_button_status=getLocal('current_bid').activity_name==details_activity_name   &&
                                                getLocal('current_bid').bid_id==details_bid_id
                                               ? "show_end" : "disabled_end";
                       break;
                }
                case "end_bid":      $scope.the_button_status="disabled_end";break;
                default:             $scope.the_button_status="disabled_end";break;
            }
        }


//  获得的当前页面的bid_messages信息
        function   getThisPageBidMessages()
        {
            var bid_messages=getLocal('bid_messages');
            var this_page_messages=_.filter(bid_messages,function(bid_message)
            {
                return bid_message.activity_name==getLocal('details_activity').activity_name  &&
                    bid_message.bid_id == getLocal('details_bid').bid_id ;
            });
            return this_page_messages;
        }


 //显示已竞价的信息列表和人数
        function showBidMessages()
        {
            var  this_page_messages=getThisPageBidMessages();
            $scope.BidsMessages=this_page_messages;
            $scope.the_bid_count=$scope.BidsMessages==[] ? 0 : $scope.BidsMessages.length;
        }



         $scope.goBackBidsLists=function()
         {
             $location.path('/BidLists');
         }


        $scope.endBidDetails=function()
        {
            if(confirm('确认要结束本次竞价吗？'))
            {
                removeLocal('current_bid')       //删除当前竞价
                Bid.writeCurrentBidStatus("end_bid");//竞价状态变为结束
                Activity.writeCurrentActivityStatus("end")//活动状态变为end
                buttonStatus();

                removeLocal('page_bid_message');
                setLocal('page_bid_message',getThisPageBidMessages());//将当前页面的bid_message写入localStorage：page_bid_messages
                $location.path('/BidResult');//第四张卡要求跳转至竞价结果页面
            }
         }


//刷新页面
        $scope.refresh_bidDetailsPage=function()
        {
            showBidMessages();
        }

    });