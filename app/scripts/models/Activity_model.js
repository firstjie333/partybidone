/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


     function Activity(activity_name,activity_id)
       {
           this.activity_name=activity_name;
           this.activity_id=activity_id;
//           this.activity_createtime=Date();
//           this.activity_status=activity_status;
       };



//saveActivity（）:存储活动  localStorage取名为:activities
//对象属性：
// "activity_name":活动名称
// "activity_id": 活动(自增长类型)
//"activity_messages":创建时间（暂时保留，以后没有用处可以删除）
        function saveActivity(activity_name)
        {
            var id=isKeyNULL('activities') ? 1: getLocal('activities').length+1;
            var activity=new Activity(activity_name,id);
            setLocal('activities',activity);
        }



/***************************活动状态***********************************/
/********说明：定义了一个localStorage:current_activity_status来存储当前的状态
 *
 case "begin":活动正常开始中————（报名页面开始按钮）
 case "begin_activitycreate":活动开始中，用户还创建了新的活动————（创建页面确认创建按钮）
 case "end":活动正常结束，还没有创建新的活动————（报名页面结束按钮）
 case "end_activitycreate":活动正常结束后，用户又创建了新的活动——（创建页面确认创建按钮）
 case "end_bidcreate":活动正常结束，用户创建竞价开始
 ***********************************************************************/


//write_current_status(current_status)：当前活动状态写入
            function writeCurrentActivityStatus(current_activity_status)
            {
                localStorage.removeItem("current_activity_status");
                localStorage.setItem("current_activity_status",current_activity_status);
            }


//read_current_status():当前活动状态读出
            function readCurrentActivityStatus()
            {
                var current_activity_status=localStorage.getItem('current_activity_status');
                return  current_activity_status;
            }


/**********************当前正在进行的活动对象(key='current_activity')*****************
 current_activity=
 {
    "activity_name":
 }
 * ****************/

        function CurrentActivity(activity_name)
        {
            this.activity_name=activity_name;
        }

/************************当前页面所属的活动名称对象(key='details_activity')***********
details_activity=
 {
 "details_activityname":
 }
 * *************************/

        function DetailsActivity(activity_name)
        {
            this.activity_name=activity_name;
        }

