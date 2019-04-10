module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('grunt-contrib-connect')(grunt);
    require('connect')(grunt);

    grunt.initConfig({
        yeoman: {
            app: 'app',
            dist: 'dist',
            indexTplFile: '_index.html',
            indexHtmlFile: 'index.html',
            theme: '',
            themePath: ''
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: [
                '.tmp',
                '<%= yeoman.app %>index.html',
                '<%= yeoman.app %>/images/*',
                '<%= yeoman.app %>/themes/*/css/**/*'
            ]
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: '<%= yeoman.app %>/',
                    mainConfigFile: './require-config.js',
                    name: 'app',
                    out: '<%= yeoman.dist %>/react-angular-grunt.js',
                    optimize: 'none',
                    generateSourceMaps: false,
                    preserveLicenseComments: false,
                    skipDirOptimize: true,
                    paths: {
                        'requirejs': '../bower_components/requirejs/require',
                        'init-app': 'init-app'
                    },
                    include: [
                        'requirejs',
                        'init-app'
                    ],
                    excludeShallow: []
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/react-angular-grunt.min.js': ['<%= yeoman.dist %>/react-angular-grunt.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '*',
                    keepalive: true,
                }
            }
        }
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:dist',
            'requirejs',
            'uglify:dist'
        ]);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'connect'
        ]);
    });
};
