'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'HOME', state: 'home' },
                { label: 'ABOUT', state: 'about' },
                { label: 'MENU', state: 'menu' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

app.controller('windowCtrl', function($scope, $window, $rootScope) {
    $scope.topLevel = true;
    $scope.validState = true;

    $(window).on('scroll', function() {
        if ($window.scrollY > 30) {
            $scope.topLevel = false;
        } else {
            $scope.topLevel = true;
        }
        $scope.$digest();
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $scope.validState = toState.name === "home" ||  toState.name === 'userProfile' || toState.name === 'userProfile.userDocuments';
    });
});
