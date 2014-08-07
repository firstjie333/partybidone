/**
 * Created by fengjie on 14-8-5.
 */
'use strict';



// verifiedBidMessage(json_message):验证信息,判断短信信息是否符合格式要求,返回true/false
        function  verifiedBidMessage(json_message)
        {
            if(json_message!=null)
            {
                var message = (json_message.messages[0].message).replace(/\s/g, "");//去掉空格,其中\s：space表示空格，或者写为" "
                return   (message.length>=2) && (message.substr(0,2).toUpperCase() == "JJ");
            }
            else
            {   return false;}
        }




//验证是否已经报名：电话号码和活动名称正确
        function verifiedIsRegister(json_message)
        {
            var user_phone = json_message.messages[0].phone;
            var activity_name =isKeyNULL('current_bid')?"":getLocal('current_bid').activity_name;
//            console.log('user_phone'+user_phone);
//            console.log('activity_name '+ activity_name );
            var registerMessages=getLocal('messages');
            var is_register=_.some(registerMessages, function(isregister)
            {
                return isregister.user_phone==user_phone && isregister.activity_name==activity_name;
            })
//            console.log('是否报名'+is_register);
            return  is_register;
        }

//verifiedBidPhoneIsRepeat():要求是不重号码的信息，直接考虑电话号码是否重复;活动名称是否重复；竞价id是否重复
//返回false：1)没有报名信息2)有报名信息但号码不重复3)有报名信息号码重复但报名活动不重复
//返回true：有报名信息   号码重复(可能是一个数组)    报名活动重复
            function verifiedBidPhoneIsRepeat(json_message)
            {
                if (!isKeyNULL('bid_messages'))
                {
                 var user_phone = json_message.messages[0].phone;
                 var activity_name =isKeyNULL('current_bid')?"":getLocal('current_bid').activity_name;
                 var bid_id=isKeyNULL('current_bid')?"":getLocal('current_bid').bid_id;

                 var bid_messages =getLocal('bid_messages');//取出的所有信息对象放数组里便于循环遍历
                 var is_repeat=_.some(bid_messages, function(bid_message)
                    {
                        return bid_message.user_phone==user_phone && bid_message.activity_name==activity_name  &&  bid_message.bid_id==bid_id;
                    })
//                 console.log('是否重复报名'+is_repeat);
                 return   is_repeat;
                }
                return false;
            }




//SaveBidMessage(json_message):存储信息
            function saveBidMessage(json_message)
            {
                var register_messages=getLocal('messages');
                if(json_message!=null)
                {
                    var activity_name=isKeyNULL('current_bid')?"":getLocal('current_bid').activity_name;
                    var bid_id=isKeyNULL('current_bid')?"":getLocal('current_bid').bid_id;
                    var user_phone=json_message.messages[0].phone;
                    var user_price=(json_message.messages[0].message.replace(/\s/g, "")).substr(2);
                    var user=_(register_messages).filter(function(register)
                    {
                       return register.user_phone==user_phone && register.activity_name==activity_name;
                    });
                    var user_name=user[0].user_name;
//                    console.log(user[0].user_name);

                    var bid_message=new MessageBid(activity_name,bid_id,user_name,user_price,user_phone);
                    setLocal('bid_messages',bid_message);
                }
            }

//sendBidMessage(json_message):回复短信
            function  sendBidMessage(json_message)
            {
                if(readCurrentActivityStatus()!="end_bidcreate")
                {
//                    console.log('对不起，竞价活动尚未开始！');
                        native_accessor.send_sms(json_message.messages[0].phone,'对不起，活动尚未开始！');
                }
                else
                {
                switch(readCurrentBidStatus())
                  {
                    case "begin_bid":
                        if (!verifiedIsRegister(json_message))
                        {
//                            console.log('对不起，你没有报名此次活动！');
                          native_accessor.send_sms(json_message.messages[0].phone,'对不起，你没有报名此次活动！');
                            return;
                        }
                        if (verifiedBidPhoneIsRepeat(json_message))
                        {
//                            console.log('请勿重复出价！');
                            native_accessor.send_sms(json_message.messages[0].phone,'请勿重复出价！');
                            return;
                        }

                        saveBidMessage(json_message);
                        refreshBidDetailsPage();
//                        console.log('恭喜，已出价成功！');
                        native_accessor.send_sms(json_message.messages[0].phone,'恭喜，已出价成功！');
                        break;
                    case "end_bid":
//                        console.log('对不起，竞价活动已结束！');
                          native_accessor.send_sms(json_message.messages[0].phone,'对不起，活动已结束！');
                        break;
                    default:
//                        console.log('对不起，竞价活动尚未开始!');
                          native_accessor.send_sms(json_message.messages[0].phone,'对不起，竞价活动尚未开始!');
                }
                }

            }

//refreshPage():刷新正在进行的活动页面
//需要在成功接受并存储短信后调用，即
                function refreshBidDetailsPage()
                {
                    //getElementById(页面id号)，返回一个对象，这里应该是返回一个页面对象
                    var refresh = document.getElementById('id_refresh_bidDetailsPage');
                    if (refresh) {
                        var scope = angular.element(refresh).scope();
                            scope.$apply(function ()
                            {
                                scope.refresh_bidDetailsPage();
                            })
                    }
                }

