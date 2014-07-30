/**
 * Created by fengjie on 14-7-22.
 */
'use strict';

angular.module('angularApp')
    .controller('ActivitiesRegisterController', function ($scope,$location) {

    //显示具体的活动名称
    $scope.getname=JSON.parse(localStorage.getItem('details'));

//返回啊按钮单击事件
//传递参数，判断是否有活动正在进行中
//    $scope.go_back=function()
//        {
//            for (var i = 0; i <=  $scope.message_count; i++)
//            {
//                if (messages[i].begin =="begin")
//                {
//                    messages[i].begin
//                    return;
//                }
//            }
//            id=localStorage.getItem('activities')==null ? 0 : (JSON.parse(localStorage.getItem('activities'))).length;
//
//            $location.path('/ActivitiesLists');
//        }

    //显示活动已经报名人数
    $scope.message_count=localStorage.getItem('messages')==null ? 0:JSON.parse(localStorage.getItem('activities')).length;
    //显示活动已报名的信息
    if (localStorage.getItem('messages')!=null)
        {
            $scope.Messages=(JSON.parse(localStorage.getItem('messages'))).reverse();
        }

    $scope.go_begin=function()
    {

        //开启报名
        //显示当前有有哪些报名信息
        //将当前活动的状态保存为begin（）
        //信息是倒叙显示

    }
        $scope.end=function()
        {

            //弹出确认对话框，
            //是，关闭；否：继续保持报名状态
        }

    });
