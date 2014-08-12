/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location) {


        $scope.bid_id=getLocal('details_bid').bid_id;
        $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;


//排序：
        //验证竞价是否是数字
       // sortBy以升序排列
        function sortByBidMessages()
        {
            var page_bid_messages=getLocal('page_bid_messages');
             _.sortBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });
        }
        //显示


        //结果：竞价为一人的里面的最低的那个竞价



        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }

        $scope.goBidCensus=function()
        {
            $location.path('/BidCensus');
        }



    });