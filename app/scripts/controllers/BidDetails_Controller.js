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
                case "begin_bid": $scope.the_button_status="show_end";break;
                case "end_bid":   $scope.the_button_status="disabled_end";break;
                case "before_begin": $scope.the_button_status="disabled_end";break;////?????
            }
        }

//找出当前活动的所有bid_message
        function  getBidMessageOfActivityName()
        {
            var this_messages=[];
            var bid_messages=getLocal('bid_messages');
            for(var i=0;i<bid_messages.length;i++)
            {
                if(bid_messages[i].activity_name==getLocalString('current_bid').activity_name)
                {
                    this_messages.push(bid_messages[i]);
                }
            }
            return this_messages;
        }
//找出当前竞价的所有bid_messages
        function  getBidMessagesOfBidID()
        {
            var bid_of_bidID=[];
            var bid_of_activity_name=getBidMessageOfActivityName();
            if(!(bid_of_activity_name==[]))
            {
                for(var i=0;i<bid_of_activity_name.length;i++)
                {
                    if(bid_of_activity_name[i].bid_id==getLocalString('current_bid').bid_id)
                    {
                        bid_of_bidID.push(bid_of_activity_name[i]);
                    }
                }
            }
            return bid_of_bidID;
        }


 //显示已竞价的信息列表和人数
        function showBidMessages()
        {
            $scope.BidsMessages=getBidMessagesOfBidID();
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