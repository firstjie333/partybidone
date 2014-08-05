/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


/***************竞价对象************************/
     function  Bids(activity_name,bidID)
        {
             this.activity_name=activity_name;
             this.bid_ID= bidID;
             this.bid_messages=[];
        }




/**获得竞价id号(id=已有竞价个数+1）*/
     function getBidID(key,activity_name)
     {
         var id=0;
         if(isKeyNULL(key))
         {
             return id+1;
         }
         else
         {
             var bids=getLocalObject(key);
             for(var i=0;i<bids.length;i++)
             {
                if(bids[i]==activity_name)
                  {id=id+1};
             }
             return id+1;
         }
     }

   function saveBidMessage(key,user_name,user_phone)
   {
      //查看当前状态
       var message=
       {
          "user_name":user_name,
          "user_phone":user_phone
       }

   }

/***************************竞价状态***********************************/
/********说明：定义了一个localStorage:current_bid_status来存储当前的状态
 case "begin_bid":竞价正常开始
 case "end_bid":竞价正常结束
 ***********************************************************************/

function writeCurrentBidStatus(current_bid_status)
{
    localStorage.removeItem("current_bid_status");
    localStorage.setItem("current_bid_status",current_bid_status);
}

function readCurrentBidStatus()
{
    var current_bid_status=localStorage.getItem("current_bid_status");
    return  current_bid_status;
}