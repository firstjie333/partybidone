'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {



/****************初始化*******/
        $scope.showBackButton= (!isKeyNULL('activities'));
        $scope.go_activitiesLists= function ()
              {   $location.path('/ActivitiesLists'); }


/****************绑定的函数***********/
//isActivityRepeat():判断输入是否重名
        function isInputActivityRepeat()
        {
            var is_repeat=false;
            var activities =getLocal('activities');
            if(!isKeyNULL('activities'))
            {
                 is_repeat= _.some(activities,function(activity)
                {
                    return activity.activity_name ==$scope.activity_name;
                });
             }
            return is_repeat;
        }




//confirm(name):确认按钮的ng-click(参数是当前创建的活动名称)
        $scope.confirmCreate= function ()
        {
            if(isInputActivityRepeat())  //活动名称重复，提示错误信息
                 { $scope.show_error=true;}
            else
            {
                 Activity.saveActivity($scope.activity_name);
                 DetailsActivity.saveDetailsActivity($scope.activity_name);

                if(isKeyNULL('current_activity'))//设置当前状态（说明详见sms.js）
                    { Activity.writeCurrentActivityStatus("end_activitycreate");}
                else
                    { Activity.writeCurrentActivityStatus("begin_activitycreate");}

                $location.path('/ActivitiesRegister');//跳转创建活动报名页面
            }

        }
});