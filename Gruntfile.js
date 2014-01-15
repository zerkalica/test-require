// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webDir: 'web',
        buildDir: 'build',
        testDir: 'test',
        srcDir: '.',
        resourcesDir: 'resources/public',
        version: grunt.template.today("yyyymmddhhMM"),

        requirejs: {
            options: {
                pragmasOnSave: {
                    excludeJade: true
                },
                baseUrl: '<%= srcDir %>/src',
                mainConfigFile: '<%= srcDir %>/src/require.config.js'
            },
            dist: {
                options: {
                    pragmasOnSave: {
                        excludeJade: true,
                        compileDebug: false
                    },
                    include: ['requireLib'],
                    name: 'main',
                    out: '<%= webDir %>/js/core.<%= version %>.dist.js',
                    //optimize: 'none',
                    optimize: 'uglify2',
                    sourceMapIn: '<% webDir %>/js/core.<%= version %>.dist.map'
                    //useSourceUrl: true,
                    //generateSourceMaps: true,
                    //preserveLicenseComments: false
                }
            },

            dev: {
                options: {
                    pragmasOnSave: {
                        excludeJade: true,
                        compileDebug: true
                    },
                    include: ['requireLib'],
                    name: 'main',
                    optimize: 'uglify2',
                    out: '<%= webDir %>/js/core.<%= version %>.dev.js',
                    sourceMapIn: '<% webDir %>/js/core.<%= version %>.dev.map',
                    generateSourceMaps: true,
                    //skipDirOptimize: false,
                    //useStrict: true,
                    //removeCombined: false,
                    useSourceUrl: true,
                    preserveLicenseComments: false
                }
            },
            'css.dist': {
                options: {
                    cssIn: '<%= webDir %>/css/build/styles.<%= version %>.css',
                    optimizeCss: 'standard',
                    out: '<%= webDir %>/css/styles.<%= version %>.dist.css'
                }
            },
            'css.dev': {
                options: {
                    cssIn: '<%= webDir %>/css/build/styles.<%= version %>.css',
                    optimizeCss: 'standard.keepLines.keepComments',
                    out: '<%= webDir %>/css/styles.<%= version %>.dev.css'
                }
            }
        },

        less: {
            all: {
                options: {
                    paths: ['<%= resourcesDir %>/less'],
                    yuicompress: false
                },
                files: {
                    '<%= webDir %>/css/build/main.<%= version %>.css': '<%= resourcesDir %>/less/global.less'
                }
            }
        },

        concat: {
            all: {
                src: [
                    // jquery and vendor plugins css
                    '<%= webDir %>/css/build/main.<%= version %>.css'
                ],
                dest: '<%= webDir %>/css/build/styles.<%= version %>.css'
            }
        },

        copy: {
            resources: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= resourcesDir %>',
                        src: 'img/**',
                        dest: '<%= webDir %>'
                    },
                    {
                        src: '<%= resourcesDir %>/favicon.ico',
                        dest: '<%= webDir %>/favicon.ico'
                    },
                    {
                        src: '<%= resourcesDir %>/.htaccess',
                        dest: '<%= webDir %>/.htaccess'
                    }
                ]
            },

            scripts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcDir %>',
                        src: ['src/**/*', 'vendor/**/*.js'],
                        dest: '<%= webDir %>'
                    }
                ]
            },

            // Load config
            'config.prod': {
                files: [
                    {
                        src: '<%= srcDir %>/config/app.config.prod.js',
                        dest: '<%= srcDir %>/src/app.config.js'
                    }
                ]
            },
            'config.stage': {
                files: [
                    {
                        src: '<%= srcDir %>/config/app.config.stage.js',
                        dest: '<%= srcDir %>/src/app.config.js'
                    }
                ]
            },
            'config.test': {
                files: [
                    {
                        src: '<%= srcDir %>/config/app.config.test.js',
                        dest: '<%= srcDir %>/src/app.config.js'
                    }
                ]
            },
            'config.dev': {
                files: [
                    {
                        src: '<%= srcDir %>/config/app.config.dev.js',
                        dest: '<%= srcDir %>/src/app.config.js'
                    }
                ]
            }
        },

        preprocess: {
            dist: {
                files: {
                    '<%= webDir %>/index.html': '<%= resourcesDir %>/index.html'
                },
                options: {
                    context: {
                        NAME: '<%= pkg.name %>',
                        VERSION: '<%= version %>',
                        DEBUG: false,
                        ENV: 'dist'
                    }
                }
            },
            dev: {
                files: {
                    '<%= webDir %>/index.html': '<%= resourcesDir %>/index.html'
                },
                options: {
                    context: {
                        NAME: '<%= pkg.name %>',
                        VERSION: '<%= version %>',
                        DEBUG: false,
                        ENV: 'dev'
                    }
                }
            },
            debug: {
                files: {
                    '<%= webDir %>/index.html': '<%= resourcesDir %>/index.html'
                },
                options: {
                    context: {
                        NAME: '<%= pkg.name %>',
                        VERSION: '<%= version %>',
                        DEBUG: true,
                        ENV: 'dev'
                    }
                }
            }
        },

        watch: {
            dev: {
                files: ['Gruntfile.js', '<%= srcDir %>/**/*.js', '<%= srcDir %>/src/**/*.jade', '<%= resourcesDir %>/less/*.less'],
                tasks: ['clean:scripts', 'preprocess:dev', 'styles:dev', 'requirejs:dev', 'livereload', 'notify:build']
            },
            test: {
                files: ['Gruntfile.js', '<%= srcDir %>/**/*.js', '<%= srcDir %>/src/**/*.jade', '<%= resourcesDir %>/less/*.less'],
                tasks: ['livereload', 'notify:build']
            },
            debug: {
                files: ['Gruntfile.js', '<%= srcDir %>/**/*.js', '<%= srcDir %>/src/**/*.jade', '<%= resourcesDir %>/less/*.less'],
                tasks: ['clean:scripts', 'preprocess:debug', 'styles:dev', 'copy:scripts', 'notify:build']
            }
        },

        clean: {
            resources: {
                options: {
                    force: true
                },
                src: [
                    '<%= webDir %>/vendor',
                    '<%= webDir %>/img',
                    '<%= webDir %>/favicon.ico'
                ]
            },
            scripts: {
                options: {
                    force: true
                },
                src: [
                    '<%= webDir %>/src',
                    '<%= webDir %>/js',
                    '<%= webDir %>/css',
                    '<%= webDir %>/index.html'
                ]
            },
            temp: {
                options: {
                    force: true
                },
                src: [
                    '<%= webDir %>/css/build'
                ]
            }
        },

        jshint: {
            all: ['<%= srcDir %>/src/**/*.js'],
            options: {
                jshintrc : '.jshintrc'
            }
        },

        plato: {
            core: {
                src : '<%= srcDir %>/src/**/*.js',
                dest : '<%= buildDir %>/plato',
                options : {
                   jshint : grunt.file.readJSON('.jshintrc')
                }
            }
        },

        notify: {
            build: {
                options: {
                    title: 'Grunt: <%= pkg.name %>.<%= version %>',  // optional
                    message: 'Build complete', //required
                    subtitle: '' // optional, kinda a lot for a message
                }
            }
        },

        connect: {
            server: {
                port: 8001,
                baseDir: '<%= srcDir %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    //grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('styles:dev', ['copy:resources', 'less:all', 'concat:all', 'requirejs:css.dev', 'clean:temp']);
    grunt.registerTask('styles:dist', ['copy:resources', 'less:all', 'concat:all', 'requirejs:css.dist', 'clean:temp']);

    grunt.registerTask('prod', ['clean', 'copy:config.prod', 'styles:dist', 'preprocess:dist', 'requirejs:dist']);
    grunt.registerTask('test', ['clean', 'copy:config.test', 'styles:dist', 'preprocess:dist', 'requirejs:dist']);
    grunt.registerTask('stage', ['clean', 'copy:config.stage', 'styles:dist', 'preprocess:dist', 'requirejs:dist']);
    grunt.registerTask('dev', ['clean', 'styles:dev', 'copy:scripts', 'copy:config.dev', 'preprocess:debug']);

    grunt.registerTask('w:debug', ['dev', 'connect:server', 'watch:debug']);

    grunt.registerTask('default', ['w:debug']);
};
