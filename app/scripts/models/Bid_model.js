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

        function  lengthOfActivityBids(activity_name)
        {
            var id=0;
            if(isKeyNULL('bids'))
            {
                return id;
            }
            else
            {
                var bids=getLocal('bids');
                for(var i=0;i<bids.length;i++)
                {
                    if(bids[i].activity_name==activity_name)
                        {id=id+1;}
                }
                return id;
            }
        }

//saveBid（）:存储竞价
            function saveBid(activity_name,bid_id)
            {
                var bid=new Bid(activity_name,bid_id);
                setLocal('bids',bid);
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