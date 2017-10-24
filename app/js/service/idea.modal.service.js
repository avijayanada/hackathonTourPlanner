//  To avoid polluting the global namespace, wrap all of your functions in an IIFE.
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function () {

    angular.module('hackTravel').factory('postIdeaService',['modalService','$q',function(modalService, $q) {

        var createTAModal = function (currentIdea, type, disbleOptions) {
            var modalDefaults = {
                backdrop: false,
                keyboard: true,
                modalFade: true,
                windowClass: 'transferDefinition-modal',
                templateUrl: 'partials/service/idea.template.html',
                controller: 'PostIdeaCtrl',
                controllerAs: 'ctrl',
                size:'md',
                resolve: {
                    currentIdea: function(){
                        return currentIdea;
                    },
                    ideaType: function(){
                        return type;
                    },
                    disableOption: function(){
                        if(disbleOptions){
                            return true;
                        } else {
                            return false;
                        }
                    },
                    hasLoggedIn: userResolutionService($q)
                }
            };

            return modalService.showModal(modalDefaults);


        };

        function userResolutionService($q) {
            return $q(function(resolve, reject){
                FB.getLoginStatus(function(response) {
                    console.log("login status:", JSON.stringify(response));
                    if (response.status === 'connected') {
                        resolve({status: true, data: response});
                    } else {
                        resolve({status: false});
                    }
                });
            });
        }


        var data = {
                "innovativeIdeas": [
                    {
                        "id": 1,
                        "userId": 1,
                        "title": "string",
                        "idea": "string",
                        "likes": 14,
                        "shares": 54,
                        "date": "Oct 8, 2017 2:08:31 PM",
                        "objectId": "6126e36e-6c7d-491e-9691-a1933d903710"
                    }
                ],
                "entrepreneurIdeas": [
                    {
                        "id": 3,
                        "userId": 1,
                        "title": "new Ideas",
                        "idea": "new Idea",
                        "likes": 25,
                        "shares": 11,
                        "date": "Oct 10, 2017 8:52:20 AM",
                        "objectId": "a30c4dd3-ef3f-4043-a87d-0294c49bba70"
                    },
                    {
                        "id": 2,
                        "userId": 1,
                        "title": "new Ideas",
                        "idea": "new Idea",
                        "likes": 41,
                        "shares": 66,
                        "date": "Oct 10, 2017 8:51:40 AM",
                        "objectId": "aeaacef3-013d-44c4-9b68-442ffa64c409"
                    },
                    {
                        "id": 1,
                        "userId": 1,
                        "title": "string",
                        "idea": "string",
                        "likes": 97,
                        "shares": 75,
                        "date": "Oct 8, 2017 2:07:50 PM",
                        "objectId": "f3042cd8-fe1f-45dc-bc63-9cec57501e57"
                    }
                ],
                "iCount": 1,
                "eCount": 3
            };

            var eData =  [
                {
                    "id": 3,
                    "userId": 1,
                    "title": "One",
                    "idea": "new Idea",
                    "likes": 25,
                    "shares": 37,
                    "date": "Oct 10, 2017 8:52:20 AM",
                    "objectId": "a30c4dd3-ef3f-4043-a87d-0294c49bba70"
                },
                {
                    "id": 2,
                    "userId": 1,
                    "title": "two",
                    "idea": "new Idea",
                    "likes": 77,
                    "shares": 83,
                    "date": "Oct 10, 2017 8:51:40 AM",
                    "objectId": "aeaacef3-013d-44c4-9b68-442ffa64c409"
                },
                {
                    "id": 1,
                    "userId": 1,
                    "title": "three3",
                    "idea": "string",
                    "likes": 16,
                    "shares": 18,
                    "date": "Oct 8, 2017 2:07:50 PM",
                    "objectId": "f3042cd8-fe1f-45dc-bc63-9cec57501e57"
                }
            ];

            return {
                createIdea: createTAModal,
                baseUrl : 'http://ec2-18-221-215-60.us-east-2.compute.amazonaws.com:8000/',
                data: data,
                eData: eData
            };
        }
        ]);

    })();
