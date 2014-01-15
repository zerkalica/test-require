define(['underscore'], function (_) {
    'use strict';

    var defaultPatterns,
        defaultMessages,
        defaultValidators,
        normalizeModelValidators,
        normalizePropertyValidators,
        ModelValidator = function () {};

    defaultPatterns = ModelValidator.patterns = {
        // Matches any digit(s) (i.e. 0-9)
        digits: /^\d+$/,

        // Matched any number (e.g. 100.000)
        number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,

        // Matches a valid email address (e.g. mail@example.com)
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

        phone: /^(8|\+7) \d{3} \d{3}-\d{2}-\d{2}$/,

        // Mathes any valid url (e.g. http://www.xample.com)
        url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };

    // Error message for the build in validators.
    // {x} gets swapped out with arguments form the validator.
    defaultMessages = ModelValidator.messages = {
        required: '{0} is required',
        acceptance: '{0} must be accepted',
        min: '{0} must be greater than or equal to {1}',
        max: '{0} must be less than or equal to {1}',
        range: '{0} must be between {1} and {2}',
        length: '{0} must be {1} characters',
        minLength: '{0} must be at least {1} characters',
        maxLength: '{0} must be at most {1} characters',
        rangeLength: '{0} must be between {1} and {2} characters',
        oneOfLength: '{0} must be one of: {1} char length',
        oneOf: '{0} must be one of: {1}',
        equalTo: '{0} must be the same as {1}',
        pattern: '{0} must be a valid {1}',
        tin: '{0} must be a valid {1}'
    };

    defaultValidators = ModelValidator.validators = (function() {
        // Use native trim when defined
        var trim = String.prototype.trim ?
            function(text) {
                return text === null ? '' : String.prototype.trim.call(text);
            } :
            function(text) {
                var trimLeft = /^\s+/,
                    trimRight = /\s+$/;

                return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
            };

        var format = function(text, args) {
            return text.replace(/\{(\d+)\}/g, function(match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };

        // Determines whether or not a value is a number
        var isNumber = function(value){
            return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
        };

        // Determines whether or not not a value is empty
        var hasValue = function(value) {
            return !(
                _.isNull(value)
                || _.isUndefined(value)
                || (_.isString(value) && trim(value) === '')
                || (_.isArray(value) && value.length === 0)
            );
        };

        return {
            // Function validator
            // Lets you implement a custom function used for validation
            fn: function(rule, value, model, attr) {
                var fn = rule.fn;
                return fn.call(rule, value, model, attr);
            },

            // Required validator
            // Validates if the attribute is required or not
            required: function(rule, value, model, attr) {
                var required   = rule.required;
                var isRequired = _.isFunction(required) ? required(rule, value, model, attr) : required;
                if(!isRequired && !hasValue(value)) {
                    return false; // overrides all other validators
                }
                if (isRequired && !hasValue(value)) {
                    return format(rule.msg, [value]);
                }

                return false;
            },

            // Acceptance validator
            // Validates that something has to be accepted, e.g. terms of use
            // `true` or 'true' are valid
            acceptance: function(rule, value, model, attr) {
                if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
                    return format(rule.msg, [value]);
                }

                return false;
            },

            // Min validator
            // Validates that the value has to be a number and equal to or greater than
            // the min value specified
            min: function(rule, value, model, attr) {
                if (hasValue(value) && (!isNumber(value) || value < rule.min)) {
                    return format(rule.msg, [value, rule.min]);
                }

                return false;
            },

            // Max validator
            // Validates that the value has to be a number and equal to or less than
            // the max value specified
            max: function(rule, value, model, attr) {
                if (hasValue(value) && (!isNumber(value) || value > rule.max)) {
                    return format(rule.msg, [value, rule.max]);
                }

                return false;
            },

            // Range validator
            // Validates that the value has to be a number and equal to or between
            // the two numbers specified
            range: function(rule, value, model, attr) {
                if(hasValue(value) && (!isNumber(value) || value < rule.range[0] || value > rule.range[1])) {
                    return format(rule.msg, [value, rule.range[0], rule.range[1]]);
                }

                return false;
            },

            // Length validator
            // Validates that the value has to be a string with length equal to
            // the length value specified
            length: function(rule, value, model, attr) {
                if (hasValue(value) && (trim(value).length !== rule.length)) {
                    return format(rule.msg, [value, rule.length]);
                }

                return false;
            },

            // Min length validator
            // Validates that the value has to be a string with length equal to or greater than
            // the min length value specified
            minLength: function(rule, value, model, attr) {
                if (hasValue(value) && (trim(value).length < rule.minLength)) {
                    return format(rule.msg, [value, rule.minLength]);
                }

                return false;
            },

            // Max length validator
            // Validates that the value has to be a string with length equal to or less than
            // the max length value specified
            maxLength: function(rule, value, model, attr) {
                if (hasValue(value) && (trim(value).length > rule.maxLength)) {
                    return format(rule.msg, [value, rule.maxLength]);
                }

                return false;
            },

            // Range length validator
            // Validates that the value has to be a string and equal to or between
            // the two numbers specified
            rangeLength: function(rule, value, model, attr) {
                if (hasValue(value) && (trim(value).length < rule.range[0] || trim(value).length > rule.range[1])) {
                    return format(rule.msg, [value, rule.range[0], rule.range[1]]);
                }

                return false;
            },

            oneOfLength: function(rule, value, model, attr) {
                return (hasValue(value) && !_.contains(rule.oneOfLength, value.length))
                    ? format(rule.msg, [value, rule.oneOfLength.join(', ')])
                    : false;
            },

            // One of validator
            // Validates that the value has to be equal to one of the elements in
            // the specified array. Case sensitive matching
            oneOf: function(rule, value, model, attr) {
                return (hasValue(value) && !_.contains(rule.oneOf, value))
                    ? format(rule.msg, [value, rule.oneOf.join(', ')])
                    : false;
            },

            // Equal to validator
            // Validates that the value has to be equal to the value of the attribute
            // with the name specified
            equalTo: function(rule, value, model, attr) {
                return (!hasValue(value) || value === model.get(rule.equalTo))
                    ? false
                    : format(rule.msg, [value, rule.equalTo]);
            },

            notEqualTo: function(rule, value, model, attr) {
                return (!hasValue(value) || value !== model.get(rule.notEqualTo))
                    ? false
                    : format(rule.msg, [value, rule.notEqualTo]);
            },

            // Pattern validator
            // Validates that the value has to match the pattern specified.
            // Can be a regular expression or the name of one of the built in patterns
            pattern: function(rule, value, model, attr) {
                return hasValue(value) && !value.toString().match(defaultPatterns[rule.pattern] || rule.pattern) ? format(rule.msg, [value, rule.pattern]) : false;
            },

            tin: function(rule, value, model, attr) {
                var result;
                value = '' + value;
                value = value.split('');
                if (
                    (
                        //для ИНН в 10 знаков
                        value.length === 10 && (
                            Number(value[9]) === (
                                (
                                    2 * value[0] +
                                        4  * value[1] +
                                        10 * value[2] +
                                        3  * value[3] +
                                        5  * value[4] +
                                        9  * value[5] +
                                        4  * value[6] +
                                        6  * value[7] +
                                        8  * value[8]
                                ) % 11
                            ) % 10
                        )
                    ) || (
                        value.length === 12 && (
                            (
                                Number(value[10]) === (
                                    (
                                        7 * value[0] +
                                            2  * value[1] +
                                            4  * value[2] +
                                            10 * value[3] +
                                            3  * value[4] +
                                            5  * value[5] +
                                            9  * value[6] +
                                            4  * value[7] +
                                            6  * value[8] +
                                            8  * value[9]
                                    ) % 11
                                ) % 10
                            ) && (
                                Number(value[11]) === (
                                    (
                                        3 * value[0] +
                                            7  * value[1] +
                                            2  * value[2] +
                                            4  * value[3] +
                                            10 * value[4] +
                                            3  * value[5] +
                                            5  * value[6] +
                                            9  * value[7] +
                                            4  * value[8] +
                                            6  * value[9] +
                                            8  * value[10]
                                    ) % 11
                                ) % 10
                            )
                        )
                    )
                ) {
                    result = false;
                } else {
                    result = format(rule.msg, [value, rule.tin]);
                }

                return result;
            },

            collectionRange: function(rule, value, model, attr) {
                if (_.isArray(value)) {
                    _.defaults(rule, {
                        collectionRange: [0, 1000]
                    });

                    var min = rule.collectionRange[0],
                        max = rule.collectionRange[1];

                    var isMax = (max && value.length > max);
                    if ((min && value.length < min) || isMax) {
                        if (!rule.maxMsg) {
                            rule.maxMsg = rule.msg;
                        }

                        return format(isMax ? rule.maxMsg : rule.msg, [value, min, max]);
                    }
                }

                return false;
            },

            collectionMin: function(rule, value, model, attr) {
                if (_.isArray(value)) {
                    _.defaults(rule, {
                        collectionMin: 0
                    });

                    var min = rule.collectionMin;

                    if (min && value.length < min) {
                        if (!rule.maxMsg) {
                            rule.maxMsg = rule.msg;
                        }

                        return format(rule.msg, [value, min]);
                    }
                }

                return false;
            },

            collectionMax: function(rule, value, model, attr) {
                if (_.isArray(value)) {
                    _.defaults(rule, {
                        collectionMax: 99
                    });

                    var max = rule.collectionMax;

                    if (max && value.length > max) {
                        if (!rule.maxMsg) {
                            rule.maxMsg = rule.msg;
                        }

                        return format(rule.msg, [value, max]);
                    }
                }

                return false;
            }
        };
    }());

    normalizePropertyValidators = function(attrValidationSet) {
        if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
            attrValidationSet = {
                fn: attrValidationSet
            };
        }

        // Stick the validator object into an array
        if(!_.isArray(attrValidationSet)) {
            attrValidationSet = [attrValidationSet];
        }

        var result = [];

        _.each(attrValidationSet, function (attrValidation) {
            var types = _.without(_.keys(attrValidation), 'msg', 'get', 'fn', 'groups', 'type');
            _.each(types, function(type) {
                var attrValidationNew = _.pick(attrValidation, 'get', 'msg', 'fn', 'groups', 'type', type);
                _.defaults(attrValidationNew, {
                    msg: defaultMessages[type] || null,
                    fn:  defaultValidators[type] || null,
                    type: type,
                    get: function (model, name) { return model.get(name); },
                    groups: null
                });

                if (_.isString(attrValidationNew.groups)) {
                    attrValidationNew.groups = [attrValidationNew.groups];
                }

                result.push(attrValidationNew);
            });
        });

        return result;
    };

    normalizeModelValidators = function (model) {
        model.validation            = model.validation || {};
        model._validationNormalized = model._validationNormalized || false;

        if (!model._validationNormalized) {
            _.each(model.validation, function(propertyRules, name) {
                model.validation[name] = normalizePropertyValidators(propertyRules);
            }, this);

            model._validationNormalized = true;
        }
    };

    _.extend(ModelValidator.prototype, {
        _validators: defaultValidators,

        validate: function (model, group, passedItems, prefix, validated) {
            var result,
                validationList = [],
                validators = this._validators;

            validated = validated || {};

            if (!_.isArray(group)) {
                group = group ? [group] : [];
            }

            passedItems = passedItems || [];
            prefix = prefix || '';
            normalizeModelValidators(model);

            _.each(model.validation, function (propertyRules, name) {
                var value,
                    memo  = [],
                    groups,
                    wasError = false;
                    _.each(propertyRules, function (rule) {
                        value = rule.get(model, name);
                        if (!wasError) {
                            groups = _.isFunction(rule.groups) ? rule.groups.call(validators, model) : rule.groups;

                            if (_.isNull(groups) || !group.length || _.intersection(groups, group).length > 0) {
                                result = rule.fn.call(validators, rule, value, model, name);
                            } else {
                                result = null;
                            }

                            if (result) {
                                wasError = true;
                                memo.push({
                                    message:      prefix + result,
                                    model:        model,
                                    propertyName: name
                                });
                            }
                        }
                    }, this);

                    if (memo.length > 0) {
                        validationList = _.union(validationList, memo);
                    } else {
                        passedItems.push({
                            model: model,
                            propertyName: name
                        });
                    }
            }, this);

            return validationList;
        },

        getErrorList: function(model, group, fields) {
            var passed = [];

            var errors = this.validate(model, group, passed);

            if (fields) {
                errors = _.filter(errors, function (item) {
                    return _.contains(fields, item.propertyName);
                });
            }

            return errors.length ? {errors: errors, passed: passed} : null;
        }
    });

    return new ModelValidator();
});
