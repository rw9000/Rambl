<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="stylesheets/screen.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body ng-app="rambl">
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div ng-controller="ramblController">

            <div class="scoreboard">
                <div class="country-list-wrapper" ng-class="{'open' : countryListOpen}">
                    <div class="country-list">
                        <div class="region">
                            <h1 class="region-title">Europe</h1>
                            <ul class="double">
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'europe'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="region">
                            <h1 class="region-title">Africa</h1>
                            <ul class="double">
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'africa'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="region">
                            <h1 class="region-title">Asia</h1>
                            <ul class="double">
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'asia'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="region">
                            <h1 class="region-title">North America</h1>
                            <ul>
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'north america'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="region">
                            <h1 class="region-title">South America</h1>
                            <ul>
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'south america'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="region last">
                            <h1 class="region-title">Oceania</h1>
                            <ul>
                                <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'oceania'}" ng-class="{'guessed' : country.guessed}">
                                    <span class="region-{{country.region|lowercase}}" ng-show="country.guessed">{{country.names[0]}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="score" ng-click="countryListOpen = !countryListOpen">{{correctGuesses}} / 196 <i class="fa" ng-class="{'fa-arrow-circle-down' : !countryListOpen, 'fa-arrow-circle-up' : countryListOpen}"></i></div>
            </div>

            <div class="map-container">
    			<div class="map"></div>
    		</div>

            <input type="text" autofocus="autofocus" class="country-text" ng-model="guess" ng-change="check()" placeholder="enter a country name..."/>
        </div>

        

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
        <script src="js/mapael/raphael/raphael-min.js"></script>
        <script src="js/mapael/jquery.mapael.js"></script>
        <script src="js/mapael/maps/world_countries_2.js"></script>
        <script src="js/app.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
    </body>
</html>