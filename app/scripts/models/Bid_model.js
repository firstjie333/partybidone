/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


/***************竞价对象************************/
//只需要知道是当前哪一个活动即可，而id号会自动调用函数计算
     function  Bids(activity_name)
        {
           this.activity_name=activity_name;
           this.bid_ID= this.lengthOfActivityBids+1;
           this.bid_messages=[];

           //所有竞价个数
           this.lengthOfAllBids=lengthOfAllBids;
           function lengthOfAllBids()
           {
               isKeyNULL('bids')?0:getLocal('bids').length;
           }
           //当前活动对应的竞价个数
           this.lengthOfActivityBids=lengthOfActivityBids;
           function  lengthOfActivityBids()
           {
               var id=0;
               if(isKeyNULL(key))
               {
                   return id;
               }
               else
               {
                   var bids=getLocal(key);
                   for(var i=0;i<bids.length;i++)
                   {
                       if(bids[i]==activity_name)
                       {id=id+1;}
                   }
                   return id;
               }
           }
        }


/***************************竞价状态***********************************/
/********说明：定义了一个localStorage:current_bid_status来存储当前的状态
 case "begin_bid":竞价正常开始
 case "end_bid":竞价正常结束
 ***********************************************************************/
//写 当前竞价状态
        function writeCurrentBidStatus(current_bid_status)
        {
            localStorage.removeItem("current_bid_status");
            localStorage.setItem("current_bid_status",current_bid_status);
        }
//读  当前竞价状态
        function readCurrentBidStatus()
        {
            var current_bid_status=localStorage.getItem("current_bid_status");
            return  current_bid_status;
        }


/************************当前正在进行的竞价对象*******
 * current_bid=
 {
   "bid_id":
   "activity_name":
 }
 * **************************/
        function CurrentBid(activity_name,bid_id)
        {
            this.activity_name=activity_name;
            this.bid_id=bid_id;
        }


/************************当前页面所属的竞价名称***********
 details_bid=
 {
 "details_activityname":
 "detais_bidID":
 }
 * *************************/
        function DetailsBid(activity_name,bid_id)
        {
            this.activity_name=activity_name;
            this.bid_id=bid_id;
        }