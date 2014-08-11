/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


/***************竞价对象************************/
//只需要知道是当前哪一个活动即可，而id号会自动调用函数计算
     function  Bid(activity_name,bid_id)
        {
           this.activity_name=activity_name;
           this.bid_id= bid_id;
           this.bid_name="竞价"+bid_id;
        }

//计算当前活动已有的竞价个数
     Bid.lengthOfActivityBids=function(activity_name)
     {
         var id=0;
         if(isKeyNULL('bids'))
             { return id; }
         else
             {
                 var bids=getLocal('bids');
                 var this_bids= _.filter(bids,function(bid)
                 {
                     return bid.activity_name==activity_name;
                 });
                 id=this_bids==[] ? 0 :this_bids.length;
                 return id;
             }
     }


//saveBid（）:存储竞价
            Bid.saveBid=function(activity_name)
            {
                var bid_id=Bid.lengthOfActivityBids(activity_name)+1;
                var bid=new Bid(activity_name,bid_id);
                setLocal('bids',bid);
                return bid;
            }






/***************************竞价状态***********************************/
/********说明：定义了一个localStorage:current_bid_status来存储当前的状态
 case "begin_bid":竞价正常开始
 case "end_bid":竞价正常结束
 ***********************************************************************/
//写  当前竞价状态
        Bid.writeCurrentBidStatus=function(current_bid_status)
        {
            localStorage.removeItem("current_bid_status");
            localStorage.setItem("current_bid_status",current_bid_status);
        }
//读  当前竞价状态
        Bid.readCurrentBidStatus=function()
        {
            var current_bid_status=localStorage.getItem("current_bid_status");
            return  current_bid_status;
        }


/************************当前正在进行的竞价对象(key='current_bid')*******
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

        CurrentBid.prototype.saveCurrentBid=function(activity_name,bid_id)
        {
            var details_bid=new CurrentBid(activity_name,bid_id)
            setLocalString('current_bid',details_bid);
        }

/************************当前页面所属的竞价名称(key='details_bid')***********
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


        DetailsBid.prototype.saveDetailsBid=function(activity_name,bid_id)
        {
            var details_bid=new DetailsBid(activity_name,bid_id);
            setLocalString('details_bid',details_bid);
        }