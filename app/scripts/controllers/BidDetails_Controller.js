/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidDetailsController', function ($scope,$location) {

         $scope.go_back_bidsLists=function()
         {
             $location.path('/BidLists');
         }

        $scope.end_bidDetails=function()
        {
            if(confirm('确认要结束本次竞价吗？'))
            {
                  //结束按钮使能
            }
        }


    });