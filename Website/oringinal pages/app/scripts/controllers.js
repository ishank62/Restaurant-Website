'use strict';

angular.module('restaurantApp')
    .controller('MenuController', ['$scope' , 'menuFactory' , function($scope , menuFactory){
        
        $scope.tab = 1;                             //active tab for menu navigation
        $scope.filtText = "";
        $scope.showDetails = false;
        
        $scope.dishes = {};
            
        menuFactory.getDishes()
            .then(
                function(response){
                    $scope.dishes = response.data;
                }); // get dishes object array from db.json

        $scope.select=function(setTab){
            $scope.tab=setTab;

            if(setTab === 2){
                $scope.filtText="appetizers";
            } 
            else if(setTab === 3){
                $scope.filtText="mains";
            }   
            else if(setTab === 4){
                $scope.filtText="desserts";
            }   
            else{
                 $scope.filtText="";             //for getting back to the menu
            } 
        };             

        $scope.isSelected = function(checkTab){
            return ($scope.tab === checkTab);
        };
        
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

    }])
    
    .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
        
             var channels = [{value:"tel", label:"Tel."},
                             {value:"Email",label:"Email"}];
        
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

    .controller('FeedbackController', ['$scope', function($scope) {
             $scope.sendFeedback = function() {
                    console.log($scope.feedback);
                 
                    //if channel is not selected and send feedback pressed declare error
                    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                        $scope.invalidChannelSelection = true;
                        console.log('incorrect');
                    }
                    else {//if invalid then clear the whole form out and set to default
                        $scope.invalidChannelSelection = false;
                        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                           agree:false, email:"" };
                        $scope.feedback.mychannel="";

                        $scope.feedbackForm.$setPristine();
                        console.log($scope.feedback);
                    }
             };
        }])


    .controller('DishDetailController', ['$scope', '$stateParams' , 'menuFactory' , function ($scope , $stateParams , menuFactory) {

        $scope.dish = {};
            
            menuFactory.getDish(parseInt($stateParams.id,10))
                .then(
                    function(response){
                        $scope.dish = response.data;
                    });
        
    }])
    
    .controller('DishCommentController', ['$scope', function ($scope) {

    $scope.formComment = {
        author: "",
        rating: "5",
        comment: ""
    };

    $scope.submitComment = function () {
        $scope.formComment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.formComment);
        $scope.formComment = {
            author: "",
            rating: "5",
            comment: ""
        };
        $scope.commentForm.$setPristine();
    };
}])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

        $scope.dish = {};
            menuFactory.getDish(0)
                .then(
                    function(response){
                        $scope.dish = response.data;
                    });
        $scope.promotion = menuFactory.getPromotion(0);
        $scope.leader = corporateFactory.getLeader(3);

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();

    }])
;

$(document).ready(function(){

            $("#carousel-pause").click(function(){
                $("#mycarousel").carousel('pause');
            });

            $("#carousel-play").click(function(){
                $("#mycarousel").carousel('cycle');
            });
            
        });