/**
 * Created by Aryeh on 06/06/2016.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration will be written here
        bower: {
            install: {
                options: {
                    install: true,
                    copy: true,
                    targetDir: './libs',
                    cleanup: true
                }
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'src/*.js' ]
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },

        html2js: {
            options: {
                module: 'grid-input-templates'
            },
            dist: {
                src: [ 'src/*.html' ],
                dest: 'tmp/templates.js'
            }
        },

        concat: {
            options: {
                separator: '\r\n',
                banner: 'angular.module(\'gridInput\',' +
                ' [\'grid-input-templates\', \'ngMaterial\']);\r\n'
            },
            dist: {
                src: [ 'src/*.js', 'tmp/*.js' ],
                dest: 'dist/gridInput.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/gridInput.min.js': [ 'dist/gridInput.js' ]
                }
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/*.js', 'src/*.html', 'src/*.scss' ],
                tasks: [ 'jshint', 'html2js:dist', 'concat:dist', 'sass', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'src/*.js', 'src/*.html' ],
                tasks: [ 'jshint', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'index.html' ],
                    dest: '/'
                }, {
                    src: [ 'dist/**' ],
                    dest: 'dist/'
                }, {
                    src: [ 'libs/**' ],
                    dest: 'libs/'
                }]
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/gridInput.css': 'src/gridInput.scss'
                }
            }
        }
    });

    // Loading of tasks and registering tasks will be written here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('package', [ 'bower', 'jshint', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist' ]);

};