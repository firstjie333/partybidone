'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {



/****************初始化*******/
//是否显示返回按钮
//是否显示重名错误提示
        $scope.showBackButton=(JSON.parse(localStorage.getItem('activities')))==null ? 'false':'true';
//        $scope.error=false;
/*****************初始化结束***********************/

//go—back():返回按钮的ng-click
        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }

//isActivityRepeat():判断是否重名
        function isActivityRepeat()
        {
            var is_activity_repeat=false;
            var activities = JSON.parse(localStorage.getItem('activities') || '[]');
            //下面将判断是否出现名字重复：
            // 重复则显示提示信息，并返回；
            // 不重复则保存对象activity到数组acts里面，并把acts数组存入到localstorage里面
            if(activities!=null)
            {
                for (var i = 0; i <activities.length; i++)
                {
                    is_activity_repeat = activities[i].activity_name ==$scope.activity_name;
                }
             }
            return is_activity_repeat;
        }
//saveActivity（）:存储活动  localStorage取名为:activities
//对象属性：
// "activity_name":活动名称
// "activity_id": 活动(自增长类型)
//"activity_messages":创建时间（暂时保留，以后没有用处可以删除）
        function saveActivity()
        {
            var acts = JSON.parse(localStorage.getItem('activities') || '[]');
            var id;
            if(acts!=null)
            { id=localStorage.getItem('activities')==null ? 0 : (JSON.parse(localStorage.getItem('activities'))).length;
            }
            //存储活动信息到localstorage：activities
            var activity =
               {"activity_name":$scope.activity_name,
                   "activity_id": id+1,
//                   "activity_messages":"[]"
//                 "activity_createtime":"",
               };
            acts.push(activity);
            localStorage.setItem("activities",JSON.stringify(acts));
        }

//saveDetails():传递活动信息参数到localstorage：details
        function saveDetails()
        {

            var detail={"details_name":$scope.activity_name};
            localStorage.removeItem("details");
            localStorage.setItem("details",JSON.stringify(detail));
            $location.path('/ActivitiesRegister');
        }



//confirm(name):确认按钮的ng-click(参数是当前创建的活动名称)
        $scope.confirm= function ()
        {
            //活动名称重复，提示错误信息
            if(isActivityRepeat())
            {
                $scope.error=true;
            }
            //活动名称不重复，存储活动/传递参数/设置当前状态
            else
            {
                saveActivity();
                saveDetails();

                //设置当前状态（说明详见sms.js）
                if(localStorage.getItem('begin_activity')==null)
                { write_current_status("end_activitycreate");}
                else
                { write_current_status("begin_activitycreate");}
            }

        }
});