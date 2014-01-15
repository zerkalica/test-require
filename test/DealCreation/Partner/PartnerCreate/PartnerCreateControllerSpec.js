define([
    'app',
    'DealCreation/Partner/PartnerCreate/PartnerCreateController'
], function (
    app,
    PartnerCreateController
) {
    'use strict';

    describe('DealCreation/Partner/PartnerCreate/PartnerCreateController', function () {
        var partnerCreateController,
            data,
            newData,
            server;

        data = {
            workName: 'test1',
            name: 'contact name 1',
            phone: '+7 911 123-45-67',
            email: 't@t.tt',
            comment: 'xxxxxxxxxxx'
        };
        newData = {
            id: 1,
            workName: 'test1',
            name: 'contact name 1',
            phone: '+7 911 123-45-67',
            email: 't@t.tt',
            comment: 'xxxxxxxxxxx'
        };

        beforeEach(function () {
            partnerCreateController = new PartnerCreateController({
                region: app.mainRegion
            });
            server = sinon.fakeServer.create();
            server.autoRespond = true;
        });

        afterEach(function () {
            server.restore();
        });

        it('Create view present on the page', function () {
            $.when(partnerCreateController.show(data)).then(function (view) {
                expect(view.$el.find('#workName').length).to.be.equal(1);
            });
        });

        it('create', function (done) {
            server.respondWith('POST', '/v2/partner', [
                200,
                {"Content-Type": "application/json"},
                JSON.stringify(newData)
            ]);

            partnerCreateController.on('save', function (data) {
                expect(data).to.have.property('id');
                expect(data.id).to.be.equal(1);
                done();
            });

            $.when(partnerCreateController.show(data)).then(function (view) {
                var value;
                view.$el.find('.jsEdit').click();

                _.each(data, function (val, key) {
                    $('#' + key).val(val);
                });
                $('.jsSave').click();
            });
        });
    });
});
