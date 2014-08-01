//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})

var native_accessor = {
    send_sms: function (phone, message)
    {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
          console.log(phone, message);//模拟
//        console.log('flag');
    },

    //相当一个间接桥梁
    receive_message: function (json_message)
    {
        if (typeof this.process_received_message === 'function')
        {
            this.process_received_message(json_message);
        }
    },


//1)短信格式处理：去空格；BM开头；
//2)提取有用信息包括：姓名，电话号码.并进行存储
//3)当前活动状态的判定
//4)回复短信
    process_received_message: function (json_message)
    {

        //如果活动尚未开始，或者活动状态错误，
        if (!Message.check_apply_status() && Message.check_apply_detail_status())
        {
            native_accessor.send_sms(json_message.messages[0].phone,'活动尚未开始，请稍候。');
            //console.log('活动尚未开始，请稍候。');
            return;
        }
        //console.log('aaaaaaaaaaaaaaa');
    }
};






//真正执行的函数
   function notify_message_received(message_json)
      {
        //console.log(JSON.stringify(message_json));
        //console.log(message_json.messages[0].message);

        //JSON.stringify(message_json);
        //alert(JSON.stringify(message_json.messages));
        native_accessor.receive_message(message_json);
        //phone_number=message_json.messages[0].phone;
       }

//By  fengjie：
//执行notify_message_received(message_json)——>调用native_accessor.receive_message(message_json)
//——>调用 process_received_message :function (json_message)：这个函数才是真正一些操作.

