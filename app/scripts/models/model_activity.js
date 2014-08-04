/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


     function Activity(activity_name,activity_id)
       {
           this.activity_name=activity_name;
           this.activity_id=activity_id;
//           this.activity_status=activity_status;
           this.activity_createtime=Date();

       };




/***************************活动状态***********************************/
/********说明：定义了一个localStorage:current_status来存储当前的状态
 case "begin":活动正常开始中————（报名页面开始按钮）
 case "begin_activitycreate":活动开始中，用户还创建了新的活动————（创建页面确认创建按钮）
 case "end":活动正常结束，还没有创建新的活动————（报名页面结束按钮）
 case "end_activitycreate":活动正常结束后，用户又创建了新的活动——（创建页面确认创建按钮）
 ********/

   var current_status={"current_status":""};

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





/***获得当前活动名称*/
    function getCurrentActivityName()
        {
            getLocalString('begin_name');
        }