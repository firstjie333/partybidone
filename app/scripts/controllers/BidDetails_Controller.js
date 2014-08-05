/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidDetailsController', function ($scope,$location) {

/********初始化***********************/
        $scope.the_bid_id=getLocal('details_bid').bid_id;
//        $scope.the_bid_count=
        buttonStatus();




         $scope.go_back_bidsLists=function()
         {
             $location.path('/BidLists');
         }

        $scope.end_bidDetails=function()
        {
            if(confirm('确认要结束本次竞价吗？'))
            {
                writeCurrentBidStatus("end_bid");

            }
        }
        function  buttonStatus()
        {
            switch(readCurrentBidStatus())
            {
                case "begin_bid": $scope.the_button_status="end_show";break;
                case "end_bid":   $scope.the_button_status="end_disabled";break;
            }
        }

    });