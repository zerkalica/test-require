// Set the require.js configuration for your application.
requirejs.config({
    paths: {
        'requireLib': '../vendor/bower/requirejs/require',
        'jade': '../vendor/require-jade/jade',

        'test': '../test',

        'mocha': '../node_modules/mocha/mocha',
        'chai': '../node_modules/chai/chai',

        'chai-backbone': '../node_modules/chai-backbone/chai-backbone',
        'chai-changes': '../node_modules/chai-changes/chai-changes',
        'chai-jquery': '../node_modules/chai-jquery/chai-jquery',
        'sinon': '../node_modules/sinon/pkg/sinon',
        'sinon-chai': '../node_modules/sinon-chai/lib/sinon-chai',

        'underscore': '../vendor/bower/underscore/underscore',
        'jquery': '../vendor/bower/jquery/jquery',
        'backbone': '../vendor/bower/backbone/backbone',
        'Backbone.ModelBinder': '../vendor/Backbone.ModelBinder',
        'backbone.wreqr': '../vendor/bower/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../vendor/bower/backbone.babysitter/lib/amd/backbone.babysitter',
        'Backbone.Marionette': '../vendor/bower/marionette/lib/core/amd/backbone.marionette',
        'Backbone.Syphon': '../vendor/bower/backbone.syphon/lib/amd/backbone.syphon',

        'config': './app.config'
    },
    shim: {
        'mocha': {
            exports: 'mocha'
        },
        'chai': {
            deps: ['mocha'],
            exports: 'chai'
        },
        'sinon': {
            deps: ['chai'],
            exports: 'sinon'
        },
        'sinon-chai': {
            deps: ['sinon'],
            exports: 'sinon'
        },
        'chai-jquery': {
            deps: ['jquery', 'chai'],
            exports: 'chai'
        },
        'chai-backbone': {
            deps: ['chai', 'backbone', 'chai-changes'],
            exports: 'chai'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});

