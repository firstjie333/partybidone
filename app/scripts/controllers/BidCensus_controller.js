/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidCensusController', function ($scope,$location) {


        $scope.bid_id=getLocal('details_bid').bid_id;
        $scope.bid_messages_count=getLocal('page_bid_messages')==null ? 0 : getLocal('page_bid_messages').length;
        $scope.Page_Bid_Messages=getBidCensusMessages();

        var victor=getVictor();
        if(victor==undefined)
        {
            $scope.bid_result="failure";
        }
        else
        {
            $scope.bid_result="success";
            $scope.user_name=victor.user_name;
            $scope.user_price=victor.user_price;
            $scope.user_phone=victor.user_phone;
        }


        $scope.goBackBidsLists=function()
        {
            removeLocal('page_bid_messages');
            $location.path('/BidLists');
        }
        $scope.goBidResult=function()
        {
            $location.path('/BidResult');
        }


    });