(function(){
    'use strict';
    angular.module('hackTravel')
        .controller('HomeController',['$scope', '$state', '$http', '$q', 'toastr',
            function ($scope, $state, $http, $q, toastr) {
                var ctrl = this;
                ctrl.directionsDisplay = new google.maps.DirectionsRenderer;
                ctrl.directionsService = new google.maps.DirectionsService;
                ctrl.onDateChange = onDateChange;
                ctrl.loadAnotherPoint = loadAnotherPoint;

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 7,
                    center: {lat: 41.85, lng: -87.65}
                });

                ctrl.listingData = [{
                    name: 'Chicago',
                    value: 'chicago, il'
                },{
                    name: 'St Louis',
                    value: 'st louis, mo'
                }, {
                    name: 'Joplin, MO',
                    value: 'joplin, mo'
                },{
                    name: 'Oklahoma City',
                    value: 'oklahoma city, ok'
                }, {
                    name: 'Amarillo',
                    value: 'amarillo, tx'
                }, {
                    name: 'Gallup, NM',
                    value: 'gallup, nm'
                },{
                    name: 'Flagstaff, AZ',
                    value: 'flagstaff, az'
                }, {
                    name: 'Winona',
                    value: 'winona, az'
                }, {
                    name: 'Kingman',
                    value: 'kingman, az'
                },{
                    name: 'Barstow',
                    value: 'barstow, ca'
                }, {
                    name: 'San Bernardino',
                    value: 'san bernardino, ca'
                }, {
                    name: 'Los Angeles',
                    value: 'los angeles, ca'
                }];

                ctrl.dates = {};


                init();

                function init(){
                    ctrl.dates.start = ctrl.listingData[0].value;
                    ctrl.dates.end = ctrl.listingData[0].value;

                    initMap();
                }

                function initMap() {
                    ctrl.directionsDisplay.setMap(map);
                }

                function  onDateChange() {
                    calculateAndDisplayRoute(ctrl.directionsService, ctrl.directionsDisplay, map);
                }

                function calculateAndDisplayRoute(directionsService, directionsDisplay, map) {
                    var start = ctrl.dates.start;
                    var end = ctrl.dates.end;
                    var request = {
                        origin: start,
                        destination: end,
                        travelMode: 'DRIVING',
                        provideRouteAlternatives: true
                    };

                    directionsService.route(request, function(response, status) {
                        if (status === 'OK') {

                            var routesSteps = [];
                            var routes = response.routes;
                            var colors = ['#071f30', 'green', 'red', 'orange', 'yellow', 'black'];

                            for (var i = 0; i < 1; i++) {

                                new google.maps.DirectionsRenderer({
                                    map: map,
                                    directions: response,
                                    routeIndex: i,
                                    polylineOptions: {
                                        strokeColor: colors[i],
                                        strokeWeight: 8,
                                        strokeOpacity: 1
                                    }
                                });

                                var points = scaledPoints(angular.copy(routes[i].overview_path));
                                var stepsCoords = [];
                                console.log("length = " + points.length);
                                for (var j = 0; j < points.length; j++) {
                                    var lat = points[j].lat();
                                    var lng = points[j].lng();
                                    stepsCoords[j] = new google.maps.LatLng(lat, lng);
                                    new google.maps.Marker({
                                        position: stepsCoords[j],
                                        map: map,
                                        icon: {
                                            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                                            scale: .3,
                                            fillColor: colors[i],
                                            fillOpacity: .3,
                                            strokeWeight: 0
                                        }
                                    });
                                }

                                scaleLatitudes(points);
                                routesSteps[i] = stepsCoords;
                            }



                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                }
                
                function setImageData(promiseData) {
                    var imageData = [];
                    promiseData.forEach(function (latitudeData) {
                        if(latitudeData.data && latitudeData.data.sections &&
                        latitudeData.data.sections.destination && latitudeData.data.sections.destination.data){
                            latitudeData.data.sections.destination.data.forEach(function (innerData) {
                                if(innerData.images && innerData.images.data) {
                                    innerData.images.data[0].title = innerData.geo.name;
                                    imageData.push(innerData.images.data);
                                }
                            });
                        }

                    });
                }

                function getActivityImagesImages(lat,lng) {
                    return $http({
                        url: 'https://apim.expedia.com/x/tcs/service/travel/latLng?latitude='
                        +lat+'&longitude='+lng+'&apk=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYWNrYXRob24iLCJpc3MiOiJUcmF2ZWwgQ29udGVudCBTZXJ2aWNlIEF1dGhlbnRpY2F0aW9uIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTUwOTIwNjU4Mn0.5IUuc_XKbBzhYKBIFj85VlUvCYnnAQHObPIyieUGTlWaCaVcabw55mZ7cOemxjJJmUSWkW6lM_BkfOdZhQQK9Q&tag=architecture&langId=EN&sections=DESTINATION&version=2&useCache=false',
                        headers: {key: '4f8ce657-ee06-4527-a8d8-4b207f8f0d62'},
                        method: 'GET'
                    });
                }

                function scaleLatitudes(points) {
                    console.log("whole points:");
                    console.log(points);
                    ctrl.points = points;

                    var lat = ctrl.points[0].lat();
                    var lng = ctrl.points[0].lng();

                    getActivityImagesImages(lat, lng).then(function (successResponse) {

                        if(successResponse && successResponse.data && successResponse.data.sections &&
                            successResponse.data.sections.destination && successResponse.data.sections.destination.data[0]) {

                            ctrl.latLongData = successResponse.data.sections.destination.data[0];
                            ctrl.imageData = successResponse.data.sections.destination.data[0].images.data;
                            ctrl.currentLatPoint = 0;
                        } else {
                            toastr.error("No more activities", "Image Load");
                        }

                    }, function (err) {
                        console.log("error");
                    });
                }

                function scaledPoints(points) {
                    var numberOfPoints = points.length;
                    var scaleFactor = 1;
                    if (parseInt(numberOfPoints) >= 20) {
                        scaleFactor = Math.floor(parseInt(numberOfPoints) / 10);
                    } else {
                        scaleFactor = 2;
                    }

                    ctrl.scaledPoints = [];
                    for(var j=  0; j < numberOfPoints; j = j + parseInt(scaleFactor)) {
                        ctrl.scaledPoints.push(points[j]);
                    }
                    return ctrl.scaledPoints;

                }


                function loadAnotherPoint(type) {

                    if (type === 'n' && parseInt(ctrl.scaledPoints.length) > parseInt(ctrl.currentLatPoint)) {
                        ctrl.currentLatPoint = ctrl.currentLatPoint + 1;
                    } else if(type === 'n' && parseInt(ctrl.scaledPoints.length) <= parseInt(ctrl.currentLatPoint)) {
                        ctrl.disableNext = true;
                        ctrl.disablePrev = false;
                    }else if(type === 'p' && parseInt(ctrl.scaledPoints.length) > 0) {
                        ctrl.currentLatPoint = ctrl.currentLatPoint - 1;
                    } else {
                        ctrl.disableNext = false;
                        ctrl.disablePrev = true;
                    }

                    var lat = ctrl.scaledPoints[ctrl.currentLatPoint].lat();
                    var lng = ctrl.scaledPoints[ctrl.currentLatPoint].lng();

                    console.log("get data for the points: lat is: ", lat , " and lng: ",lng);
                    getActivityImagesImages(lat, lng).then(function (successResponse) {
                        console.log("new data set for ", ctrl.currentLatPoint);
                        if(successResponse && successResponse.data && successResponse.data.sections &&
                            successResponse.data.sections.destination && successResponse.data.sections.destination.data[0]) {
                            console.log(successResponse.data.sections.destination.data);

                            ctrl.latLongData = successResponse.data.sections.destination.data[0];
                            ctrl.imageData = successResponse.data.sections.destination.data[0].images.data;


                            var stepsCoords = new google.maps.LatLng(lat,lng);

                            new google.maps.Marker({
                                position: stepsCoords,
                                map: map,
                                icon: {
                                    path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                                    scale: .9,
                                    fillColor: '#000',
                                    fillOpacity: .3,
                                    strokeWeight: 0
                                }
                            });
                        } else {
                            toastr.error("No more activities", "Image Load");
                        }


                    }, function (err) {
                        console.log("error");
                    });

                }


            }]);

})();
