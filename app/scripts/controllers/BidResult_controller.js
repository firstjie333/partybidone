/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location) {


         $scope.bid_id=getLocal('details_bid').bid_id;
         $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;




        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }

        $scope.goBidCensus=function()
        {
            $location.path('/BidCensus');
        }



    });