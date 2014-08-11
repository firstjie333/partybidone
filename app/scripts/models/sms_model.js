//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
'use strict';

var native_accessor = {
    send_sms: function (phone, message) {

        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
//         console.log('flag');
//        console.log(phone, message);
    },

    //相当一个间接桥梁
    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },



    process_received_message: function (json_message)
    {
        /*******************报名短信************************/
       if(MessageRegister.verifiedMessage(json_message))//验证短信格式
       {
           if(!MessageRegister.verifiedIsRepeat(json_message))//验证号码是否重复，活动是否重复
           {
               MessageRegister.sendMessage(json_message);//发送短信（包含保存信息的函数和刷新页面函数）
           }
       }

        /*************竞价短信*********************/
        if(MessageBid.verifiedBidMessage(json_message))//验证短信格式
        {
            MessageBid.sendBidMessage(json_message);//发送短信（包含验证是否报名，验证是否重复，保存信息，刷新页面函数）
        }
    }
};


//真正执行的发短信的函数
     function notify_message_received(message_json)
      {
        native_accessor.receive_message(message_json);
       }



