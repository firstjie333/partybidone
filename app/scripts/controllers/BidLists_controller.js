/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidListsController', function ($scope,$location) {

        $scope.Bids=getLocalObject('bids').reverse();


        $scope.go_back_activityLists=function()
        {
            $location.path('//ActivitiesLists');
        }

        $scope.create_bidDetails=function()
        {


            var activity_name=getLocalObject('details_activity').details_activityname;//获得当前活动名称
            var bid_id=getBidID('bids',activity_name);//获得要存储的id号
            //存储竞价信息
            saveBid(activity_name,bid_id);
            //存储详细竞价页面的
            saveDetailsBid(activity_name,bid_id);
            //活动状态变为end_bidcreate
            writeCurrentActivityStatus('end_bidcreate');
            //竞价状态变为begin_bid
            writeCurrentBidStatus('begin_bid');


            //竞价列表页面的开始按钮状态变为灰色不可点击
            //竞价列表和活动列表的底色为黄色


            //页面跳转
             $location.path('/BidDetails');
        }

        function  saveBid(activity_name,bid_id)
            {
                var bid=new Bids(activity_name,bid_id);//创建一个竞价活动
                setLocalObject('bids',bid);//存储一个竞价活动
            }

        function saveDetailsBid(activity_name,bid_id)
        {
            var detail_bid=
            {
                "details_activityname":activity_name,
                "details_bidid":bid_id
            };
            setLocalString('details_bid',detail_bid);
        }

    });