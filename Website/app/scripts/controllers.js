'use strict';

angular.module('restaurantApp')
    .controller('MenuController', ['$scope' , 'menuFactory' , function($scope , menuFactory){
        
        $scope.tab = 1;                             //active tab for menu navigation
        $scope.filtText = "";
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        
        $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        // get dishes object array from db.json

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

        $scope.showDish = false;
        $scope.message = "Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
    }])
    
    .controller('DishCommentController', ['$scope', 'menuFactory' , function ($scope , menuFactory) {

    $scope.formComment = {
        author: "",
        rating: "5",
        comment: ""
    };

    $scope.submitComment = function () {
        $scope.formComment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.formComment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
        
        $scope.formComment = {
            author: "",
            rating: "5",
            comment: ""
        };
        $scope.commentForm.$setPristine();
    };
}])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message = "Loading ...";
        
        $scope.dish = menuFactory.getDishes().get({id:0})
        .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
        );
        
        $scope.promotion = menuFactory.getPromotions().get({id: 0})
        .$promise.then(
                function (response) {
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
        );
        
        $scope.leader = corporateFactory.getLeaders().get({id: 3})
        .$promise.then(
                function (response) {
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
        );
        
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.showLeaders = false;

        $scope.leaders = corporateFactory.getLeaders().query(
            function (response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }]);