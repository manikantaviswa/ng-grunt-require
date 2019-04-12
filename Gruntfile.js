module.exports = function (grunt) {
    'use strict';

    require('grunt-contrib-clean')(grunt);
    require('grunt-contrib-requirejs')(grunt);
    require('grunt-contrib-uglify')(grunt);
    require('connect')(grunt);
    require('grunt-contrib-connect')(grunt);
    require('grunt-contrib-watch')(grunt);
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.initConfig({
        yeoman: {
            app: 'app',
            dist: 'dist',
            indexTplFile: 'index.tpl.html',
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
        processhtml: {
            options: {
            },
            dist: {
                files: {
                    '<%= yeoman.indexTplFile %>': ['<%= yeoman.indexHtmlFile %>']
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
            options: {
                port: 12345,
                open: true,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: false,
                    base: [
                        '.'
                    ]
                }
            },
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>',
                interval: 500,
                debounceDelay: 500
            },
            files: [
                '<%= yeoman.app %>/**/*.html',
                '<%= yeoman.app %>/**/*.js'
            ]
        },
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/**/*.js'
                ],
                options: {
                    livereload: true,
                    interval: 500,
                    debounceDelay: 500
                }
            },
            index: {
                files: [
                    '<%= yeoman.indexTplFile %>'
                ],
                options: {
                    interval: 500,
                    debounceDelay: 500
                },
                tasks: ['replace:server-index']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>',
                    interval: 500,
                    debounceDelay: 500
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '<%= yeoman.app %>/**/*.tpl.html',
                    '<%= yeoman.app %>/data/**/*',
                    '<%= yeoman.app %>/{,themes/*/}{css,sass}/**/*.{css,sass,scss}',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '!<%= yeoman.app %>bower_components/**/*.html'
                ]
            }
        }
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:dist',
            'requirejs',
            'uglify:dist',
            'processhtml',
        ]);
    });

    grunt.registerTask('serve', function (target) {
        console.log('serving on', target);
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:server']);
        }

        grunt.task.run([
            'processhtml',
            'connect:livereload',
            'watch:js'
        ]);
    });
};
