'use strict';

//var fs       = require( 'fs' );
//var execSync = require( 'child_process' ).execSync;

var use_external_ts_build_for_watch = false;

var DEFAULT_CONFIG_PATH = "./config.json";

/********************************************************************************/
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({});

    var CONFIG_PATH = grunt.option('config') || DEFAULT_CONFIG_PATH;

    var pkg = grunt.file.readJSON('package.json');

    var config = grunt.file.readJSON(CONFIG_PATH);
    var path_output = config.path.dest;

    console.log("------------------------------------------------------");
    console.log("Config: " + CONFIG_PATH);
    console.log("Source path: " + config.path.source.root);
    console.log("Destination path: " + config.path.dest.root);
    console.log("------------------------------------------------------");

    /********************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        dist: {
            options: {
                force: true
            },
            files: [{
                dot: true,
                src: [
                    config.path.dest.root + '/{,*/}*',
                    '!' + config.path.dest.root + '/.git{,*/}*'
                ]
            }]
        }
    });

    /********************************************************/
    grunt.loadNpmTasks('grunt-assemble-less');
    var lesscfg = {
        options: {
            plugins: [
                (new(require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })),
                (new(require('less-plugin-clean-css'))({
                    advanced: true,
                    compatibility: 'ie8'
                }))
            ],
            compress: true,
            globalVars: {
                'path_css': "\"" + config.path.dest.css + "\"",
                'path_images': "\"" + config.path.dest.images + "\"",
                'path_fonts': "\"" + config.path.dest.fonts + "\""
            }
        },
        build: {
            files: {}
        }
    };

    var path_src_css = config.path.source.root + config.path.source.css;
    var path_dest_css = config.path.dest.root + config.path.dest.css;

    lesscfg['build']['files'][path_dest_css + '/main.css'] = path_src_css + '/main.less';

    grunt.config('less', lesscfg);

    /********************************************************/
    grunt.loadNpmTasks('grunt-contrib-watch');

    var watch_opts = {
        root: {
            files: [config.path.source.root + config.path.source.top_level + '/**/*'],
            tasks: ['copy']
        },
        images: {
            files: [config.path.source.root + config.path.source.images + '/**/*'],
            tasks: ['copy:images']
        },
        fonts: {
            files: [config.path.source.root + config.path.source.fonts + '/**/*'],
            tasks: ['copy:fonts']
        },
        js: {
            files: [
                config.path.source.root + config.path.source.scripts + '/**/*.js',
                '!' + config.path.source.root + config.path.source.scripts + '/assets/js/node_modules/**/*'
            ],
            tasks: ['copy:scripts']
        },
        styles: {
            files: [config.path.source.root + config.path.source.css + '/**/*.less'],
            tasks: [
                'less'
            ]
        },
        pages: {
            files: [
                config.path.source.root + '/**/*.twig',
                config.path.source.root + '/**/*.info',
                config.path.source.root + config.path.source.views + "/../data.json"
            ],
            tasks: ['twigRender:main']
        }
    };

    grunt.config('watch', watch_opts);

    /********************************************************/
    grunt.loadNpmTasks('grunt-twig-render');
    grunt.config('twigRender', {
        options: {},
        main: {
            files: [{
                data: [
                    CONFIG_PATH,
                    config.path.source.root + config.path.source.views + "/../data.json"
                ],
                // dataPath: "potato",
                expand: true,
                cwd: config.path.source.root + config.path.source.views,
                src: ["**/*.twig", "!**/_*.twig"],
                dest: config.path.temp,
                ext: ".html"
            }]
        }
    });



    grunt.loadNpmTasks('grunt-minify-html');
    grunt.config('minifyHtml', {
        options: {
            comments: true
        },
        dist: {
            files: {
                "docs/index.html": config.path.temp + "/index.html"
            }
        }
    });


    /********************************************************/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        images: {
            files: [{
                expand: true,
                flatten: false,
                dot: true,
                cwd: config.path.source.root + config.path.source.images,
                dest: config.path.dest.root + config.path.dest.images,
                src: ['**/*']
            }]
        },
        fonts: {
            files: [{
                expand: true,
                flatten: false,
                dot: true,
                cwd: config.path.source.root + config.path.source.fonts,
                dest: config.path.dest.root + config.path.dest.fonts,
                src: ['**/*']
            }]
        },
        scripts: {
            files: [{
                expand: true,
                flatten: false,
                dot: true,
                cwd: config.path.source.root + config.path.source.scripts,
                dest: config.path.dest.root + config.path.dest.scripts,
                src: [
                    '**/*.js',
                    '**/*.css',
                    '**/*.gif',
                    '**/*.woff',
                    '**/*.ttf',
                    '!**/node_modules/**'
                ]
            }]
        },
        // Everything in the root path gets copied 1:1 to the theme root
        root: {
            files: [{
                expand: true,
                flatten: false,
                dot: true,
                cwd: config.path.source.root + config.path.source.top_level,
                dest: config.path.dest.root + config.path.dest.top_level + '/',
                src: ['**/*.*']
            }]
        }
    });

    /******** Register Tasks *************/
    // By default we'll do a complete clean and rebuild
    grunt.registerTask('default', ['clean', 'less', 'twigRender', 'copy', 'minifyHtml']);
}