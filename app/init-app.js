(function (require, window) {
    'use strict';
    var isProduction = require.toUrl('') === './';
    if (isProduction) {
        require.config({
            urlArgs: 'bust=' + Date.now(),
            paths: {
                'config': 'app/config'
            }
        });
    }
    require(['angular', 'app'], function (angular, app) {
        angular.element(window.document).ready(function () {
            angular.bootstrap(window.document, [app.name], { strictDi: false });
        });
    });
})(require, window);
