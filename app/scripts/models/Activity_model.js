/**
 * Created by fengjie on 14-8-4.
 */
'use strict';

//Activity活动类
     function Activity(activity_name)
       {
           this.activity_name=activity_name;
//           this.activity_id=activity_id;
//           this.activity_createtime=Date();
//           this.activity_status=activity_status;
       };

//类方法
        Activity.saveActivity=function(activity_name)
        {
            var activity=new Activity(activity_name);
            setLocal('activities',activity);
            return activity;
        };

/***************************活动状态***********************************/
/********说明：定义了一个localStorage:current_activity_status来存储当前的状态
 case "begin":活动正常开始中————（报名页面开始按钮）
 case "begin_activitycreate":活动开始中，用户还创建了新的活动————（创建页面确认创建按钮）
 case "end":活动正常结束，还没有创建新的活动————（报名页面结束按钮）
 case "end_activitycreate":活动正常结束后，用户又创建了新的活动——（创建页面确认创建按钮）
 case "end_bidcreate":活动正常结束，用户创建竞价开始
 ***********************************************************************/

      /****************关于状态改变的方法尽可能写成实例方法**********************/

//write_current_status(current_status)：当前活动状态写入
            Activity.writeCurrentActivityStatus=function(current_activity_status)
            {
                localStorage.removeItem("current_activity_status");
                localStorage.setItem("current_activity_status",current_activity_status);
            }


//read_current_status():当前活动状态读出
            Activity.readCurrentActivityStatus=function()
            {
                var current_activity_status=localStorage.getItem('current_activity_status');
                return  current_activity_status;
            }


/**********************当前正在进行的活动对象(key='current_activity')*****************/
        function CurrentActivity(activity_name)
        {
            this.activity_name=activity_name;
        }

         CurrentActivity.prototype.saveCurrentActivity=function(activity_name)
        {
            var current_activity=new CurrentActivity(activity_name);
            setLocalString('current_activity',current_activity);//存储当前正在进行的活动
        }



/************************当前页面所属的活动名称对象(key='details_activity')***********/

        function DetailsActivity(activity_name)
        {
            this.activity_name=activity_name;
        }

        DetailsActivity.prototype.saveDetailsActivity=function(activity_name)
        {
            var detail=new DetailsActivity(activity_name);//创建当前活动报名页面的对象
            setLocalString('details_activity',detail);
        }

