'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {

        $scope.showerror=false;
        //是否显示返回按钮
        $scope.show=false;


        //返回按钮的ng-click：go—back事件
        $scope.go_back= function ()
            {
                $location.path('/ActivitiesLists');
            }

        //确认按钮的ng-click:confirm事件


        $scope.confirm= function ()
        {
            var acts = JSON.parse(localStorage.getItem('activities')|| '[]');
            if(acts!=null)
            {
                for (var i = 0; i < acts.length; i++) {
                    if (acts[i] == $scope.name) {
                        $scope.showerror = true;
                        return;
                    }
                }
            }
            var activity = {"name": $scope.name, "id": 0};
            acts.push(activity); //  将txt输入文档中的内容添加到变量activity中
            localStorage.setItem("activities",JSON.stringify(acts));
            $location.path('/ActivitiesLists');
            }







});