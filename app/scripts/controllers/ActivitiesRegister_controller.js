/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {

    //显示具体的活动名称
    $scope.getname=JSON.parse(localStorage.getItem('details'));

    //
    $scope.go_back=function()
        {
            $location.path('/ActivitiesLists');
        }

    $scope.go_start=function()
    {
        //开启报名
        //显示当前有有哪些报名信息
        //信息是倒叙显示

    }

    });
