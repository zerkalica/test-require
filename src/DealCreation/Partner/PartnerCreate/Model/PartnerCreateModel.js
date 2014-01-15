define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PartnerCreateModel = Backbone.Model.extend({
        alias: 'partnerCreate',
        urlRoot: '/v2/partner',

        defaults: {
            workName: null,
            name: null,
            email: null,
            phone: null,
            comment: null
        },

        validation: {
            workName: {
                required: true,
                msg: 'Название компании не может быть пустым'
            },
            name: {
                required: true,
                msg: 'Введите имя'
            },
            email: {
                pattern: 'email',
                required: true,
                msg: 'Введите email'
            },
            phone: {
                pattern: 'phone',
                required: true,
                msg: 'Партнер: Контакты: телефон должен быть в формате: +7 911 123-45-67'
            }
        }
    });

    return PartnerCreateModel;
});
