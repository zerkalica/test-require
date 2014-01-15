require([
    'app',
    'app.config'
], function (app, config) {
    'use strict';

    var options = {
        history: {
            pushState: false,
            root: '/'
        },
        debug: true
    };

    accounting.settings = config.accounting;
    app.start(options);

});
