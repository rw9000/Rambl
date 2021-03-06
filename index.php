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
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="stylesheets/screen.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body ng-app="rambl" ng-controller="ramblController" noscroll>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div class="scoreboard" ng-class="{'open' : countryListOpen}">
            <div class="country-list-wrapper" ng-class="{'open' : countryListOpen}">
                <div class="country-list">
                    <div class="region">
                        <h1 class="region-title">Europe</h1>
                        <ul class="double">
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'europe'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="region">
                        <h1 class="region-title">Africa</h1>
                        <ul class="double">
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'africa'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="region">
                        <h1 class="region-title">Asia</h1>
                        <ul class="double">
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'asia'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="region">
                        <h1 class="region-title">North America</h1>
                        <ul>
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'north america'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="region">
                        <h1 class="region-title">South America</h1>
                        <ul>
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'south america'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="region">
                        <h1 class="region-title">Oceania</h1>
                        <ul class="last">
                            <li class="country-tile" ng-repeat="country in countries|orderBy:['names[0]']|filter:{'region':'oceania'}" ng-class="{'guessed' : country.guessed, 'revealed' : country.reveal}">
                                <span class="region-{{country.region|lowercase}}" ng-show="country.guessed || country.reveal">{{country.names[0]}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="timer"><i class="fa fa-clock-o"></i> {{gameTime | date:'mm:ss'}}</div>

            <div class="score" ng-click="countryListOpen = !countryListOpen">{{correctGuesses}} / {{countries.length}} <i class="fa" ng-class="{'fa-arrow-circle-down' : !countryListOpen, 'fa-arrow-circle-up' : countryListOpen}"></i></div>
        </div>

        <mapael></mapael>

        <div class="controls"><button ng-click="giveUp()">Give up</button> <input type="text" ng-disabled="!gameActive" autofocus="autofocus" class="country-text" ng-model="guess" ng-change="checkInput(guess)" placeholder="enter a country name..."/> <button ng-click="reset()">Reset</button></div>
        
        <modal-dialog show='modalShown' width='30%'>
            <h1>{{modalTitle}}</h1>
            <span class="score" ng-show="gameStarted"><em>{{correctGuesses}}</em> out of <em>{{countries.length}}</em></span>
            <p>{{modalText}}</p>
            <button ng-click="startGame()">Go!</button>
            <a href="https://twitter.com/share" class="twitter-share-button" data-text="I know {{correctGuesses}} out of 196 countries, bitches" ng-show="gameStarted">Tweet</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        </modal-dialog>


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
        <script src="js/mapael/raphael/raphael-min.js"></script>
        <script src="js/mapael/jquery.mapael.js"></script>
        <script src="js/mapael/maps/world_countries_2.js"></script>
        <script src="js/modules/ngDialog.min.js"></script>
        <script src="js/app.js"></script>
        <script src="js/directives.js"></script>

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