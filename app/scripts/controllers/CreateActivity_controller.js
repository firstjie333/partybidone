'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {

        //是否显示返回按钮
        ////返回按钮的ng-click：go—back事件
        $scope.error=false;
        $scope.showBackButton=(JSON.parse(localStorage.getItem('activities')))!=null ? 'true':'false';
        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }

        //确认按钮的ng-click:confirm事件:
        $scope.confirm= function ()
        {
            var acts = JSON.parse(localStorage.getItem('activities') || '[]');
            //下面将判断是否出现名字重复：
            // 重复则显示提示信息，并返回；
            // 不重复则保存对象activity到数组acts里面，并把acts数组存入到localstorage里面
            if(acts!=null)
            {
                for (var i = 0; i < acts.length; i++) {
                    if (acts[i].name == $scope.name) {
                        $scope.error = true;
                        return;
                    }
                }
            }
            var activity = {"name": $scope.name, "id": 0};
            acts.push(activity); //  将txt输入文档中的内容添加到变量activity中
            localStorage.setItem("activities",JSON.stringify(acts));
            $location.path('/ActivitiesRegister');
            }
});