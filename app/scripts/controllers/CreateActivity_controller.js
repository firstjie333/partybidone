/**
 * Created by fengjie on 14-7-22.
 */


angular.module('angularApp')
    .controller('CreateActivityController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var activity = {"name":$scope.name};   //将txt输入文档中的内容添加到变量activity中
        localStorage.setItem("activities", JSON.stringify(activity));   //再将activities中的数据储存到本地数据库中



        //写一个判断有没有活动的函数getActCount()
        /*confirm（）确认按钮点击事件*/
        /*
        $scope.confirm=function()
        {
            if(getActCount()==0)
            {
              $location.path();//页面跳转
            }
            else
            {
                localStorage.setItem('activities',name);
                $location.path('ActivitiesLists');
            }

        }
        */
        /*isshow（）判断输入活动名称是否重名*/
        $scope.isshow=function()
        {
            var isshow=true;
            return  isshow;
        }




    });