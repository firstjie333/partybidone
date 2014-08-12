/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidCensusController', function ($scope,$location) {


        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }
        $scope.goBidResult=function()
        {
            $location.path('/BidResult');
        }


    });