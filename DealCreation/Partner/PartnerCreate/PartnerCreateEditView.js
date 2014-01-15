define([
    'underscore',
    'Backbone.Marionette',
    'AbstractControls/Controller/EditViewMixin',
    'jade!DealCreation/Partner/PartnerCreate/Templates/PartnerCreateEditViewTemplate'
], function (_, Marionette, EditViewMixin, PartnerCreateEditViewTemplate) {
    'use strict';

    var PartnerCreateEditView = Marionette.ItemView.extend(_.defaults({
        template: PartnerCreateEditViewTemplate
    }, EditViewMixin));

    return PartnerCreateEditView;
});
