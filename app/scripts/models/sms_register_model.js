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


//1)短信格式处理：去空格；BM开头；
//2)提取有用信息包括：姓名，电话号码.并进行存储
//3)当前活动状态的判定
//4)回复短信
    process_received_message: function (json_message)
    {
       if(verifiedMessage(json_message))//验证短信格式
       {
           if(!verifiedIsRepeat(json_message))//验证号码是否重复，活动是否重复
           {
               sendMessage(json_message);//发送短信（包含保存信息的函数和刷新页面函数）
           }
       }


        if(verifiedBidMessage(json_message))//验证短信格式
        {
            if(verifiedIsRegister(json_message))//验证是否报名
            {
                if(!verifiedBidPhoneIsRepeat(json_message))
                {}
                else
                {}
            }
//            if(!verifiedIsRepeat(json_message))//验证号码是否重复，活动是否重复
//            {
//                sendMessage(json_message);//发送短信（包含保存信息的函数和刷新页面函数）
//            }
        }
    }
};




// verifiedMessage(json_message):验证信息,判断短信信息是否符合格式要求,返回true/false
        function  verifiedMessage(json_message)
        {
            if(json_message!=null)
            {
                var message = (json_message.messages[0].message).replace(/\s/g, "");//去掉空格,其中\s：space表示空格，或者写为" "
                return   (message.length>=2) && (message.substr(0,2).toUpperCase() == "BM");
//                console.log((message.length>=2) && (message.substr(0,2).toUpperCase() == "BM"));
            }
            else
            { return false;}
        }


//verifiedIsRepeat():要求是保留重名不重号码的信息，直接考虑电话号码是否重复和报名活动是否重复
//返回false：1)没有报名信息2)有报名信息但号码不重复3)有报名信息号码重复但报名活动不重复
//返回true：有报名信息   号码重复(可能是一个数组)    报名活动重复
        function verifiedIsRepeat(json_message)
        {
            var user_phone = json_message.messages[0].phone;
            var activity_name =isKeyNULL('current_activity')?"":getLocal('current_activity').activity_name;
            if (!isKeyNULL('messages'))
            {
                var messages =getLocal('messages');;//取出的所有信息对象放数组里便于循环遍历
                for (var i = 0; i < messages.length; i++)
                {
                    if((messages[i].user_phone == user_phone) && (messages[i].activity_name == activity_name))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
//SaveMessage(json_message):存储信息
        function saveRegisterMessage(json_message)
        {
            if(json_message!=null)
            {
                var user_name =(json_message.messages[0].message.replace(/\s/g, "")).substr(2);
                var user_phone=json_message.messages[0].phone;
                var activity_name=isKeyNULL('current_activity')?"":getLocal('current_activity').activity_name;
                var mess =getLocal('messages');
                var message=
                {
                    "user_name": user_name,
                    "user_phone": user_phone,
                    "activity_name": activity_name
                };
                mess.push(message);
                localStorage.setItem("messages", JSON.stringify(mess));
            }
        }

//sendMessage(json_message):回复短信
        function  sendMessage(json_message)
        {
                switch(readCurrentActivityStatus())
                {
                    case "begin":
//                        console.log('恭喜，报名成功！');
                        saveRegisterMessage(json_message);
                        refreshPage();
                        native_accessor.send_sms(json_message.messages[0].phone,'恭喜，报名成功！');
                        break;
                    case "begin_activitycreate":
//                        console.log('恭喜，报名成功！');
                        saveRegisterMessage(json_message);
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


//notify_message_received(message_json):真正执行的发短信的函数
     function notify_message_received(message_json)
      {
        native_accessor.receive_message(message_json);
       }

//By  fengjie：
//执行notify_message_received(message_json)——>调用native_accessor.receive_message(message_json)
//——>调用 process_received_message :function (json_message)：这个函数才是真正一些操作.

