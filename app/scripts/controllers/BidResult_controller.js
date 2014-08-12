/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location) {


        $scope.bid_id=getLocal('details_bid').bid_id;
        $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;
        $scope.Page_Bid_Messages=sortByBidMessages();
     
        var victor=getVictor();
        $scope.user_name=victor.user_name;
        $scope.user_price=victor.user_price;
        $scope.user_phone=victor.user_phone;
        console.log(victor);




        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }

        $scope.goBidCensus=function()
        {
            $location.path('/BidCensus');
        }



    });