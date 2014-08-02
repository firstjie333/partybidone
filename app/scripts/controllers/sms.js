//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})


var native_accessor = {
    send_sms: function (phone, message)
    {
         native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
//       console.log(phone, message);//模拟
//       console.log('flag');
    },

    //相当一个间接桥梁
    receive_message: function (json_message)
    {
//        console.log(typeof this.process_received_message);
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
       if(verifiedMessage(json_message))//验证短信格式
       {
           if(!verifiedIsRepeat(json_message))//验证号码是否重复，活动是否重复
           {
               sendMessage(json_message);//发送短信（包含保存信息的函数和刷新页面函数）
           }
       }
    }
};


/***************************全局函数***********************************/
/********说明：定义了一个localStorage:current_status来存储当前的状态
 case "begin":活动正常开始中————（报名页面开始按钮）
 case "begin_activitycreate":活动开始中，用户还创建了新的活动————（创建页面确认创建按钮）
 case "end":活动正常结束，还没有创建新的活动————（报名页面结束按钮）
 case "end_activitycreate":活动正常结束后，用户又创建了新的活动——（创建页面确认创建按钮）
 ********/

//write_current_status(current_status)：当前状态写入
        function write_current_status(current_status)
        {
            localStorage.removeItem("current_status");
            localStorage.setItem("current_status",current_status);
        }
//read_current_status():当前状态读出
        function read_current_status()
        {
            var current_status=localStorage.getItem("current_status");
            return  current_status;
        }

// verifiedMessage(json_message):验证信息,判断短信信息是否符合格式要求,返回true/false
        function  verifiedMessage(json_message)
        {
            var message = (json_message.messages[0].message).replace(/\s/g, "");//去掉空格,其中\s：space表示空格，或者写为" "
//          console.log(message.substr(0,2).toUpperCase() =="BM");//测试
            //如果短信本身就小于两个字符
            var is_right=(message.length>=2) && (message.substr(0,2).toUpperCase() == "BM")
//            console.log(is_right);//测试
            return  is_right ; //提取出前两个字符
        }


//verifiedIsRepeat():要求是保留重名不重号码的信息，直接考虑电话号码是否重复和报名活动是否重复
//返回false：1)没有报名信息2)有报名信息但号码不重复3)有报名信息号码重复但报名活动不重复
//返回true：有报名信息   号码重复(可能是一个数组)    报名活动重复
        function verifiedIsRepeat(json_message)
        {
            var user_phone=json_message.messages[0].phone;
            var begin_activity_name=localStorage.getItem("begin_activity")==null ? "" : (JSON.parse(localStorage.getItem("begin_activity"))).activity_name;

            if(localStorage.getItem("messages")!=null)
            {
                var messages=JSON.parse(localStorage.getItem("messages"));//取出的所有信息对象放数组里便于循环遍历
                for (var i = 0; i < messages.length; i++)
                  {
                     return  (messages[i].user_phone == user_phone) && (messages[i].activity_name == begin_activity_name);
                  }
            }
            return false;
//            var is_repeat=false;
//            var user_phone=json_message.messages[0].phone;
//            var begin_activity_name=localStorage.getItem("begin_activity")==null ? "" : (JSON.parse(localStorage.getItem("begin_activity"))).activity_name;
//            if(localStorage.getItem("messages")!=null)
//              {
//                  var messages=JSON.parse(localStorage.getItem("messages"));//取出的所有信息对象放数组里便于循环遍历
//                  for(var i=0;i<messages.length;i++)
//                  {
//                      if((messages[i].user_phone==user_phone) && (messages[i].activity_name==begin_activity_name))
//                      {
//                          is_repeat=true;
//                      }
//                    console.log('同一活动能重复报名');//测试
//                  }
//              }
////            console.log(is_repeat);//测试
//            return is_repeat;
//            console.log(is_repeat);
        }

//SaveMessage(json_message):存储信息
        function saveMessage(json_message)
        {
            if(json_message!=null)
            {
                var user_name =(json_message.messages[0].message.replace(/\s/g, "")).substr(2);
                var user_phone=json_message.messages[0].phone;
                var activity_name=localStorage.getItem("begin_activity")==null ? "":(JSON.parse(localStorage.getItem("begin_activity"))).activity_name;

                var mess = JSON.parse(localStorage.getItem("messages") || '[]');
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
                switch(read_current_status())
                {
                    case "begin":
                        native_accessor.send_sms(json_message.messages[0].phone,'恭喜，报名成功！');
//                        console.log('恭喜，报名成功！');
                        saveMessage(json_message);
                        refreshPage();
                        break;
                    case "begin_activitycreate":
                        native_accessor.send_sms(json_message.messages[0].phone,'恭喜，报名成功！');
//                        console.log('恭喜，报名成功！');
                        saveMessage(json_message);
                        refreshPage();
                        break;
                    case "end":
                        native_accessor.send_sms(json_message.messages[0].phone,'Sorry，活动报名已结束!');
//                        console.log('Sorry，活动报名已结束!');
                        break;
                    case "end_activitycreate":
                        native_accessor.send_sms(json_message.messages[0].phone,'活动尚未开始，请稍后！');
//                        console.log('活动尚未开始，请稍后！');
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
//        console.log(JSON.stringify(message_json));
//        console.log(message_json.messages[0].message);
//        console.log(message_json.messages[0].phone);
//        JSON.stringify(message_json);
//        alert(JSON.stringify(message_json.messages));
        native_accessor.receive_message(message_json);
        //phone_number=message_json.messages[0].phone;
       }

//By  fengjie：
//执行notify_message_received(message_json)——>调用native_accessor.receive_message(message_json)
//——>调用 process_received_message :function (json_message)：这个函数才是真正一些操作.

