/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


/*******************各种对象的创建*************************/


/**竞价对象*/
     function  Bids(activity_name,bidID)
        {
             this.activity_name=activity_name;
             this.bid_ID= bidID;
             this.bid_messages=[];


        }
/**获得竞价id号(id=已有竞价个数+1）*/
     function setBidID(key,activity_name)
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