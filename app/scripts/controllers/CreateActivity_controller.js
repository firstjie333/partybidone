'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {

        //是否显示返回按钮
        ////返回按钮的ng-click：go—back事件
        $scope.error=false;
        $scope.showBackButton=(JSON.parse(localStorage.getItem('activities')))==null ? 'false':'true';
        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }

        //确认按钮的ng-click:confirm事件:
        $scope.confirm= function (name)
        {
            var acts = JSON.parse(localStorage.getItem('activities') || '[]');
            var id;
            //下面将判断是否出现名字重复：
            // 重复则显示提示信息，并返回；
            // 不重复则保存对象activity到数组acts里面，并把acts数组存入到localstorage里面
            if(acts!=null)
            {
                for (var i = 0; i < acts.length; i++) {
                    if (acts[i].name ==name) {
                        $scope.error = true;
                        return;
                    }
                }
                id=(JSON.parse(localStorage.getItem('activities'))).length;
            }

            //存储活动信息到localstorage：activities
            var activity = {"name": name, "id": id+1};
            acts.push(activity);
            localStorage.setItem("activities",JSON.stringify(acts));


            //传递活动信息参数到localstorage：details
            var detail={"name":name};
            localStorage.removeItem("details");
            localStorage.setItem("details",JSON.stringify(detail));
            $location.path('/ActivitiesRegister');

            }
});