/**
 * Created by fengjie on 14-7-22.
 */
 'use strict';

angular.module('angularApp')
    .controller('CreateActivityController', function ($scope,$location) {

        //是否显示返回按钮
      //  $scope.show=localStorage.getItem('activities')||[]==[]?false:true;

        //返回按钮的ng-click：go—back事件
        $scope.go_back= function () {//返回按钮的事件
            $location.path('/ActivitiesLists');
        };
        //是否使能确认按钮
      //  $scope.disabled=$scope.name.length==0?false:true;

        //确认按钮的ng-click:confirm事件
        var acts =localStorage.getItem('activities').length==null? []:JSON.parse(localStorage.getItem('activities'));
        $scope.confirm= function () {
            if (acts.length != 0) {
                for (var i = 0; i < acts.length; i++) {
                    if (acts[i] == $scope.name) {
                        $scope.error = true;
                        return;
                    }
                }
            }
//                    acts.push($scope.name);
//                    acts = JSON.stringify(acts);
//                    localStorage.setItem('activities', acts);

            var activity = {"name": $scope.name, "id": 0};
          //  将txt输入文档中的内容添加到变量activity中
            acts.push(activity);
            localStorage.setItem("activities", JSON.stringify(acts));
           // 再将activities中的数据储存到本地数据库中

            $location.path('/ActivitiesRegister');

        }



});