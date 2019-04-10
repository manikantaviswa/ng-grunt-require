(function (require) {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            angular: '../bower_components/angular/angular',
        },
        shim: {
            angular: {
                exports: 'angular'
            }
        },
        deps: [
            'app',
            'init-app'
        ],
        packages: [
        ]
    });
})(require);
