/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidCensusController', function ($scope,$location) {


        $scope.bid_id=getLocal('details_bid').bid_id;
        $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;

        $scope.Page_Bid_Messages=getBidCensusMesages();



        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }
        $scope.goBidResult=function()
        {
            $location.path('/BidResult');
        }


    });