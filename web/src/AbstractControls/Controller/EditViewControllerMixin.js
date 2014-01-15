define([
    'jquery',
    'Millwright/ModelValidator'
], function ($, ModelValidator) {
    'use strict';

    var EditViewControllerMixin = {
        View: null,
        EditView: null,
        eventNames: {
            save:   'save',
            cancel: 'cancel'
        },
        permissionsEntityName: null,

        initialize: function (options) {
            this.region        = options.region;
            this.permissions   = options.permissions;
        },

        show: function (data, showEdit) {
            var self = this,
                view,
                dfd = $.Deferred();
            $.when(self._getModel(data)).then(function (model) {
                if (!self.View || showEdit) {
                    view = self._renderEdit(model);
                } else {
                    view = self._renderView(model);
                }
                $.when(view).then(function (modelView) {
                    dfd.resolve(modelView);
                });
            });

            return dfd.promise();
        },

        _getModel: function (data) {
            var dfd = $.Deferred(),
                model;

            model = new this.Model(data);

            dfd.resolve(model);

            return dfd.promise();
        },

        _getPermissions: function () {
            return this.permissionsEntityName ? this.permissions.get(this.permissionsEntityName) : null
        },

        _renderView: function (model) {
            var self = this,
                dfn = $.Deferred(),
                view;

            if (!this.View) {
                return null;
            }

            view = new self.View({
                model: model,
                permissions: self._getPermissions()
            });

            self.listenTo(view, {
                'render': function () {
                    dfn.resolve(view);
                },
                'view:edit': function () {
                    self._renderEdit(model);
                }
            });

            self.region.show(view);

            return dfn.promise();
        },

        _renderEdit: function (model) {
            var self = this,
                dfn = $.Deferred(),
                list,
                editView;

            editView = new self.EditView({
                model: model,
                permissions: self._getPermissions()
            });

            self.listenTo(editView, {
                'render': function () {
                    dfn.resolve(editView);
                },
                'edit:cancel': function () {
                    self._renderView(model);
                    self.trigger(self.eventNames.cancel);
                },
                'edit:save': function (data) {
                    var m;
                    console.log('data = ', data);
                    data.id = model.id;
                    m = new self.Model(data);
                    list = ModelValidator.getErrorList(m);
                    console.log('create:save clicked, errors: ', list);
                    if (list) {
                        editView.showErrors(list.errors, list.passed, {prefix: self.editFormIdPrefix, id: m.id});
                    } else {
                        m.save(null, {
                            success: function (model) {
                                self._renderView(model);
                                self.trigger(self.eventNames.save, model.toJSON());
                            }
                        });
                    }
                }
            });

            self.region.show(editView);

            return dfn.promise();
        }
    };

    return EditViewControllerMixin;
});
