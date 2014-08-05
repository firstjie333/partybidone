'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {



/****************初始化*******/
        $scope.showBackButton= (!isKeyNULL('activities'));
//go—back():返回按钮的ng-click
        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }

//isActivityRepeat():判断是否重名
        function isActivityRepeat()
        {
            var is_activity_repeat=false;
            var activities =getLocalObject('activities');
            //下面将判断是否出现名字重复：
            // 重复则显示提示信息，并返回；
            // 不重复则保存对象activity到数组acts里面，并把acts数组存入到localstorage里面
            if(activities!=null)
            {
                for (var i = 0; i <activities.length; i++)
                {
                    if(activities[i].activity_name ==$scope.activity_name)
                    {
                        is_activity_repeat=true;
                        return is_activity_repeat;
                    }
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

            var id=isKeyNULL('activities') ? 1: getLocalObject('activities').length+1;
            var activity=new Activity($scope.activity_name,id);
            console.log(activity.activity_createtime);
            var activities=getLocalObject('activities');
            activities.push(activity);
            setLocalObject('activities',activities);
        }

//saveRegisterDetails():传递活动信息参数到localstorage
        function saveRegisterDetails()
        {
            var detail={"details_activityname":$scope.activity_name};
            setLocalString('details_activity',detail);
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
                saveRegisterDetails();

                //设置当前状态（说明详见sms.js）
                if(isKeyNULL('begin_activity'))
                   { writeCurrentActivityStatus("end_activitycreate");}
                else
                   { writeCurrentActivityStatus("begin_activitycreate");}
            }

        }
});