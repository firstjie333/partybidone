/**
 * Created by fengjie on 14-8-4.
 */
'use strict';

   function MessageRegister(activity_name,user_name,user_phone)
   {
       this.activity_name=activity_name;
       this.user_name=user_name;
       this.user_phone=user_phone;
   }


//验证报名信息,判断短信信息是否符合格式要求,返回true/false
        MessageRegister.verifiedMessage=function(json_message)
        {
            if(json_message!=null)
            {
                //去掉空格,其中\s：space表示空格，或者写为" "
                var message = (json_message.messages[0].message).replace(/\s/g, "");
                return   (message.length>=2) && (message.substr(0,2).toUpperCase() == "BM");
            }
            else
            { return false;}
        }


//verifiedIsRepeat():要求是保留重名不重号码的信息，直接考虑电话号码是否重复和报名活动是否重复
        MessageRegister.verifiedIsRepeat=function(json_message)
        {
            var user_phone = json_message.messages[0].phone;
            var activity_name =isKeyNULL('current_activity') ? "" : getLocal('current_activity').activity_name;
            if (!isKeyNULL('messages'))
            {
                var messages =getLocal('messages');
                var is_repeat= _.some(messages,function(message)
                {
                    return  message.user_phone == user_phone && message.activity_name == activity_name;
                });

            }
            return is_repeat;
        }


//SaveMessage(json_message):存储报名信息
            MessageRegister.saveRegisterMessage=function(json_message)
            {
                if(json_message!=null)
                {
                    var user_name =(json_message.messages[0].message.replace(/\s/g, "")).substr(2);
                    var user_phone=json_message.messages[0].phone;
                    var activity_name=isKeyNULL('current_activity') ? "" : getLocal('current_activity').activity_name;
                    var message=new MessageRegister(activity_name,user_name,user_phone);
                    setLocal('messages',message);
                }
            }


//sendMessage(json_message):回复短信
        MessageRegister.sendMessage=function(json_message)
        {
            switch( Activity.readCurrentActivityStatus())
            {
                case "begin":
        //                        console.log('恭喜，报名成功！');
                    MessageRegister.saveRegisterMessage(json_message);
                    refreshPage();
                    native_accessor.send_sms(json_message.messages[0].phone,'恭喜，报名成功！');
                    break;
                case "begin_activitycreate":
        //                        console.log('恭喜，报名成功！');
                    MessageRegister.saveRegisterMessage(json_message);
                    refreshPage();
                    native_accessor.send_sms(json_message.messages[0].phone,'恭喜，报名成功！');
                    break;
                case "end":
                    native_accessor.send_sms(json_message.messages[0].phone,'Sorry，活动报名已结束!');
        //                        console.log('Sorry，活动报名已结束!');
                    break;
                case "end_activitycreate":
                    native_accessor.send_sms(json_message.messages[0].phone,'活动尚未开始，请稍后！');
        //                      console.log('活动尚未开始，请稍后！');
                case "end_bidcreate":
                    break;
            }
        }

        //refreshPage():刷新正在进行的活动页面
        //需要在成功接受并存储短信后调用，即
        function refreshPage()
        {
            //getElementById(页面id号)，返回一个对象，这里应该是返回一个页面对象
            var page_refresh = document.getElementById('id_refresh_page');
            if (page_refresh) {
                var scope = angular.element(page_refresh).scope();
                scope.$apply(function ()
                {
                    scope.thisPageRefresh();
                })
            }
        }

