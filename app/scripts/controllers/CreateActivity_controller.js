'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {



/****************初始化*******/
        $scope.showBackButton= (!isKeyNULL('activities'));
        $scope.go_activitiesLists= function ()
            {
                $location.path('/ActivitiesLists');
            }


/****************绑定的函数***********/
//isActivityRepeat():判断输入是否重名
        function isInputActivityRepeat()
        {
            var is_repeat=false;
            var activities =getLocal('activities');
            if(activities!=[])
            {
                for (var i = 0; i <activities.length; i++)
                {
                    if(activities[i].activity_name ==$scope.activity_name)
                    {
                        is_repeat=true;
                        return is_repeat;
                    }
                }
             }
            return is_repeat;
        }




//saveRegisterDetails():传递活动信息参数到localstorage
        function saveRegisterDetails()
        {
            var detail=new DetailsActivity($scope.activity_name);//创建当前活动报名页面的对象
            setLocalString("details_activity",detail);//存储当前活动报名页面的对象
        }



//confirm(name):确认按钮的ng-click(参数是当前创建的活动名称)
        $scope.confirmCreate= function ()
        {
            //活动名称重复，提示错误信息
            if(isInputActivityRepeat())
                 { $scope.show_error=true;}
            //活动名称不重复，存储活动/传递参数/设置当前状态
            else
            {
                 saveActivity($scope.activity_name);
                 saveRegisterDetails();

                //设置当前状态（说明详见sms.js）
                if(isKeyNULL('current_activity'))
                    { writeCurrentActivityStatus("end_activitycreate");}
                else
                    { writeCurrentActivityStatus("begin_activitycreate");}
                $location.path('/ActivitiesRegister');//跳转创建活动报名页面
            }

        }
});