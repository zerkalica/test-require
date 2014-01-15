define(['underscore', 'jquery'], function (_, $) {
    'use strict';

    var ViewValidator = function (options) {
        this.options   = _.defaults(options || {}, ViewValidator.defaultSelectors);
        this.selectors = this.options.selectors;
    };

    ViewValidator.defaultSelectors = {
        selectors: {
            errorGroupClass: '.bBBAdminForm__eTextErrorGroup',
            property: function (attr, options) {
                return '#' + (options.prefix ? (options.prefix + '-') : '') + attr + (options.id ? ('-' + options.id) : '');
            },
            template: function (message) {
                message = message || '';
                return '<span class="bBBAdminForm__eTextError">' + message + '</span>';
            },
            errorGroupTemplate: function () {
                return '<span class="bBBAdminForm__eTextErrorGroup"></span>';
            },
            selector: function (propertyEl) {
                var el, p;
                if (propertyEl.length > 0) {
                    p = propertyEl.parent();
                    el = p.find(this.errorGroupClass);
                    if (el.length === 0) {
                        p.append(this.errorGroupTemplate());
                        el = p.find(this.errorGroupClass);
                    }
                }

                return el;
            }
        }
    };

    _.extend(ViewValidator.prototype, {
        _valid: function (propertyEl) {
            var el = this.selectors.selector(propertyEl);
            el.empty();
        },

        _invalid: function (propertyEl, errorMessage, isSet) {
            var el = this.selectors.selector(propertyEl),
                html = this.selectors.template(errorMessage);
            el.html(html);
        },

        placeErrors: function (list, $el, options) {
            var propertyEl,
                self = this,
                selectors = this.selectors;
            options = options || {};
            _.each(list, function (item) {
                var sel = selectors.property(item.propertyName, options);
                propertyEl = $el.find(sel);
                if (!propertyEl.length) {
                    throw 'Selector ' + sel + ' not found';
                }
                self._invalid(propertyEl, item.message);
            });
        },

        clearErrors: function (list, $el, options) {
            var propertyEl,
                self = this,
                selectors = this.selectors;
            options = options || {};
            _.each(list, function (item) {
                var sel = selectors.property(item.propertyName, options);
                propertyEl = $el.find(sel);
                if (!propertyEl.length) {
                    throw 'Selector ' + sel + ' not found';
                }
                self._valid(propertyEl);
            });
        },

        resetErrors: function (list, passed, $el, options) {
            this.placeErrors(list, $el, options);
            this.clearErrors(passed, $el, options);
        }
    });

    return ViewValidator;
});
