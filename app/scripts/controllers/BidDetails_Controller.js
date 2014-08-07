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
            switch(readCurrentBidStatus())
            {
                case "begin_bid":    $scope.the_button_status="show_end";break;
                case "end_bid":      $scope.the_button_status="disabled_end";break;
                case "before_begin": $scope.the_button_status="disabled_end";break;////?????
            }
        }

//找出当前页面的所有bid_message
        function  getBidMessagesOfThisPage()
        {
            var bid_messages=getLocal('bid_messages');
            var this_messages=_(bid_messages).filter(function(bid_message)
                    {
                         return bid_message.activity_name==getLocal('details_activity').activity_name && bid_message.bid_id == getLocal('details_bid').bid_id
                    });
            return this_messages;
        }
 //显示已竞价的信息列表和人数
        function showBidMessages()
        {
            $scope.BidsMessages=getBidMessagesOfThisPage();
            $scope.the_bid_count=$scope.BidsMessages==[]?0:$scope.BidsMessages.length;

            console.log($scope.BidsMessages);
        }


         $scope.go_back_bidsLists=function()
         {
             $location.path('/BidLists');
         }

        $scope.end_bidDetails=function()
        {
            if(confirm('确认要结束本次竞价吗？'))
            {
                removeLocal('current_bid')       //删除当前竞价
                writeCurrentBidStatus("end_bid");//竞价状态变为结束
                writeCurrentActivityStatus("end")//活动状态变为end
                buttonStatus();
            }
        }


//刷新页面
        $scope.refresh_bidDetailsPage=function()
        {
            showBidMessages();
        }

    });