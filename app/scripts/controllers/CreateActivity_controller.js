'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {


//是否显示返回按钮
        $scope.error=false;
//返回按钮的ng-click：go—back事件
        $scope.showBackButton=(JSON.parse(localStorage.getItem('activities')))==null ? 'false':'true';

        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }
//判断是否重名IsRepeat（）
        $scope.IsRepeat=function()
        {
            var acts = JSON.parse(localStorage.getItem('activities') || '[]');
            //下面将判断是否出现名字重复：
            // 重复则显示提示信息，并返回；
            // 不重复则保存对象activity到数组acts里面，并把acts数组存入到localstorage里面
            if(acts!=null)
            {
                for (var i = 0; i < acts.length; i++) {
                    if (acts[i].name ==$scope.activity_name) {
                        $scope.error = true;
                        return ;
                    }
                }
             }

        }
//存储活动SaveActivity（）
        function SaveActivity()
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
                   "activity_messages":"[]"
//                   "activity_createtime":"",
               };
            acts.push(activity);
            localStorage.setItem("activities",JSON.stringify(acts));
        }

//传递活动信息参数到localstorage：details
        function SaveDetails()
        {
            var detail={"details_name":$scope.activity_name};
            localStorage.removeItem("details");
            localStorage.setItem("details",JSON.stringify(detail));
            $location.path('/ActivitiesRegister');
        }



//确认按钮的ng-click:confirm事件:
        $scope.confirm= function (name)
        {
            $scope.IsRepeat();
            SaveActivity();
            SaveDetails();

            //设置当前状态
            if(localStorage.getItem('begin_activity')==null)
                { write_current_status("end_activitycreate");}
            else
                { write_current_status("begin_activitycreate");}

        }
});