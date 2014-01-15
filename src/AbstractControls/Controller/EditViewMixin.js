define([
    'underscore',
    'Backbone.Syphon',
    'Millwright/ViewValidator'
], function (_, Syphon, ViewValidator) {
    'use strict';

    var EditViewMixin = {
        triggers: {
            'click .jsCancel': 'edit:cancel'
        },
        events: {
            'click .jsSave': '_save'
        },

        initialize: function (options) {
            options = options || {};
            this.templateHelpers = _.defaults(options, {permissions: options.permissions});
            this.validator       = new ViewValidator();
        },
        _save: function (e) {
            e.preventDefault();
            this.trigger('edit:save', Syphon.serialize(this));
        },
        showErrors: function (errors, passedItems, options) {
            this.validator.resetErrors(errors, passedItems, this.$el, options);
        }
    };

    return EditViewMixin;
});
