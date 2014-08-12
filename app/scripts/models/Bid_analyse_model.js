/**
 * Created by fengjie on 14-8-13.
 */

'use strict';

/********存放竞价分析的全局函数*********/

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
        function getBidCensusMesages()
        {
            var page_bid_messages=sortByBidMessages();//升序排列价格
            //根据价格分类
            var count_bids= _.countBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });

            //将分类出的价格对象，重新定义对象数组
            var bid_messages= _.map(count_bids,function(value,key)
            {
                return {"user_price" :key, "user_price_count":value };
            });

            return bid_messages;

}


            function getPrice()
            {
                //找出第一个价格个数只有1个的
                var bid_messages=getBidCensusMesages();
                var price= _.find(bid_messages,function(bid_message)
                {
                    return bid_message.user_price_count==1;
                });
                return price;
            }



               function getVictor()
               {
                   var victor="";
                   if(getPrice()!=undefined)
                   {
                           var victor= _.find(page_bid_messages,function(page_bid_message)
                           {
                               return page_bid_message.user_price==price.user_price;
                           });
                   }
                   return victor;
               }