/**
 * Created by fengjie on 14-8-4.
 */
'use strict';


angular.module('angularApp')
    .controller('BidResultController', function ($scope,$location,$routeParams) {

//初始化
        initial();
        $routeParams.is_show_model==='true' ? showModelAndHideFooter() : hideModelAndShowFooter() ;


        function initial()
        {
            $scope.bid_id = getLocal('details_bid').bid_id;
            $scope.bid_messages_count = getLocal('page_bid_messages') == null ? 0 : getLocal('page_bid_messages').length;
            $scope.Page_Bid_Messages = sortByBidMessages();

            var victor = getVictor();
            if (victor == undefined) {
                $scope.bid_result = "failure";
                $scope.bid_information = "竞价失败！";
            }
            else {
                $scope.bid_result = "success";
                $scope.user_name = victor.user_name;
                $scope.user_price = victor.user_price;
                $scope.user_phone = victor.user_phone;
                $scope.bid_information = "竞价成功！";
            }
        }


//绑定
        $scope.goBackBidsLists = function () {
            removeLocal('page_bid_messages');
            $location.path('/BidLists');
        }

        $scope.goBidCensus = function () {
            $location.path('/BidCensus');
        }


//模态框
           function showModelAndHideFooter()
           {
                $('#myModal').modal('show');//‘#myModel'表示页面id show为显示模态框，hide为隐藏
                 document.getElementById("id_bid_result").style.display="none";
                setTimeout(function ()
                   {
                       hideModelAndShowFooter();
                   }, 3000);
           }



        function hideModelAndShowFooter()
        {
           document.getElementById("id_bid_result").style.display="";
            $('#myModal').modal('hide');
        }


//        $('#myModal').on('hidden', function () {
//                        $scope.show_bid_result='true';
//                    });
//
//                    $('#myModal').on('hide', function () {
//                        $scope.show_bid_result='true';
//                    });






    }

);