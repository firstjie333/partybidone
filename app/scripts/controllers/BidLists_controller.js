/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidListsController', function ($scope,$location) {

        $scope.Bids=getLocalObject('bids').reverse();
        $scope.go_back_activityLists=function()
        {

        }


        $scope.create_bidDetails=function()
        {
             var activity_name=getCurrentActivityName();//获得当前活动名称
             var bid_id=setBidID('bids',activity_name);//获得要存储的id号
             var bid=new Bids(activity_name,bid_id);//创建一个竞价活动
             setLocalObject('bids',bid);//存储一个竞价活动
             $location.path('/BidDetails');
        }

    });