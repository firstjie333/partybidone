/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location) {




        $scope.goBackBidsLists=function()
        {
            $location.path('/BidLists');
        }

        $scope.goBidCensus=function()
        {
            $location.path('/BidCensus');
        }



    });