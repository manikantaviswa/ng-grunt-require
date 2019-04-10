define([
    'angular',
], function (angular) {
    'use strict';

    var module = angular.module('requireNgApp', []);

    module.controller('myCtrl', ['$scope', function($scope) {
        $scope.msg = 'My Controller';
        console.log('inside controller');
    }]);

    return module;
});
