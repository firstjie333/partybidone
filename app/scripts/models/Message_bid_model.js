/**
 * Created by fengjie on 14-8-5.
 */
/**
 * Created by fengjie on 14-8-4.
 */
'use strict';

function MessageBid(activity_name,bid_id,user_name,user_price,user_phone,bid_number)
{
    this.activity_name=activity_name;
    this.bid_id=bid_id;
    this.user_name=user_name;
    this.user_phone=user_phone;
    this.user_price=user_price;
    this.bid_number=getBidNumber(activity_name,bid_id)+1;
}

  function getBidNumber(activity_name,bid_id)
  {
      var bid_messages=getLocal('bid_messages');
      var current_page_bid_messages=_(bid_messages).filter(function(bid_message)
          {
              return bid_message.activity_name==activity_name &&  bid_message.bid_id==bid_id;
          });
      return    current_page_bid_messages==[]?0:current_page_bid_messages.length;
  }