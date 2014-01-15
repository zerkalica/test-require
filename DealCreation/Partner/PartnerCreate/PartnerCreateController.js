define([
    'underscore',
    'Backbone.Marionette',
    'AbstractControls/Controller/EditViewControllerMixin',
    'DealCreation/Partner/PartnerCreate/Model/PartnerCreateModel',
    'DealCreation/Partner/PartnerCreate/PartnerCreateEditView'
], function (
    _,
    Marionette,
    EditViewControllerMixin,
    PartnerCreateModel,
    PartnerCreateEditView
) {
    'use strict';

    var PartnerCreateController = Marionette.Controller.extend(_.defaults({
        EditView: PartnerCreateEditView,
        Model: PartnerCreateModel
    }, EditViewControllerMixin));

    return PartnerCreateController;
});
