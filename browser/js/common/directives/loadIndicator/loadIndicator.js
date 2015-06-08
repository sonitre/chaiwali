app.directive('loadIndicator', function ($rootScope) {

    return {
        restrict:'E',
        templateUrl: 'js/common/directives/loadIndicator/loadIndicator.html',
        link:function(scope, elem, attrs){
            scope.isStateLoading = false;

            $rootScope.$on('$stateChangeStart', function() {
                console.log('being called?')
                scope.isStateLoading = true;
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                scope.isStateLoading = false;
            });

        }
    };

});