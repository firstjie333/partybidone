/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location) {


        $scope.bid_id=getLocal('details_bid').bid_id;
        $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;
        $scope.Page_Bid_Messages=sortByBidMessages();
        getVictor();

//排序：
        //验证竞价是否是数字
       // sortBy以升序排列
        function sortByBidMessages()
        {
            var page_bid_messages=getLocal('page_bid_messages');
            return  _.sortBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });
        }
        //显示
        //也就是帮顶 $scope.Page_Bid_Messages


//结果：竞价为一人的里面的最低的那个竞价
        function getVictor()
        {
            var page_bid_messages=sortByBidMessages();//升序排列价格
            //根据价格分类
            var count_bids= _.countBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });
            console.log(count_bids);
            //将分类出的价格对象，重新定义对象数组
            var bid_messages= _.map(count_bids,function(value,key)
            {
                return {"user_price" :key, "user_price_count":value };
            });
            console.log( bid_messages);
            //找出第一个价格个数只有1个的
            var price= _.find(bid_messages,function(bid_message)
            {
                return bid_message.user_price_count==1;
            })
            //如果没有全部一样的价格（竞价成功）
            if(price!=undefined)
            {
                var victor= _.find(page_bid_messages,function(page_bid_message)
                {
                    return page_bid_message.user_price==price.user_price;
                });
                $scope.user_name=victor.user_name;
                $scope.user_price=victor.user_price;
                $scope.user_phone=victor.user_phone;
                console.log(victor);
            }

        }



        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }

        $scope.goBidCensus=function()
        {
            $location.path('/BidCensus');
        }



    });