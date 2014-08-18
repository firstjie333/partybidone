/**
 * Created by fengjie on 14-8-13.
 */

'use strict';

/********存放竞价分析的全局函数*********/




 // sortBy以升序排列
        function sortByBidMessages()
        {
            var page_bid_messages=getLocal('page_bid_messages');
            return  _.sortBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });
        }
//显示: 也就是帮顶 $scope.Page_Bid_Messages




//结果：竞价为一人的里面的最低的那个竞价
        function getBidCensusMessages()
        {
          //升序排列价格
            var page_bid_messages=sortByBidMessages();
          //根据价格分类，进行个数统计
            var count_bids= _.countBy(page_bid_messages,function(page_bid_message)
            {
                return page_bid_message.user_price;
            });
          //将分类出的价格对象，重新定义为对象数组
            var bid_messages= _.map(count_bids,function(value,key)
            {
                return {"user_price" :key, "user_price_count":value };
            });
            //返回对象数组，格式为：{"user_price":   ,"user_price_count":   }
            return bid_messages;
          }

//获得最低竞价
            function getPrice()
            {
                //获得对象数组
                var bid_messages=getBidCensusMessages();
                //找出第一个价格个数只有1个的
                var price= _.find(bid_messages,function(bid_message)
                {
                    return bid_message.user_price_count==1;
                });
                //返回竞价成功的最低竞价价格
                return price;
            }


//返回胜利者信息
               function getVictor()
               {
                   var victor;
                   var page_bid_messages=getLocal('page_bid_messages');
                   if(getPrice()!=undefined)
                   {
                      victor= _.find(page_bid_messages,function(page_bid_message)
                       {
                           return page_bid_message.user_price==getPrice().user_price;
                       });
                       return victor;
                   }
                   else
                   {//竞价失败
                      return undefined;
                   }

               }