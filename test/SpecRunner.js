define([
    'mocha',
    'chai',
    'sinon',
    'sinon-chai',
    'chai-jquery',
    'chai-backbone',
    'chai-changes',
    './specs'
], function (
    mocha,
    chai,
    sinon,
    sinonChai,
    chaiJQuery,
    chaiBackbone,
    chaiChanges,
    allSpecs
) {
    "use strict";
    // Chai
    chai.use(chaiChanges);
    chai.use(chaiBackbone);
    chai.use(sinonChai);
    chai.use(chaiJQuery);

    mocha.setup('bdd');

    var specs = allSpecs;
    var queryParts = window === undefined ? [] : new String(window.location).split('?');
    if (queryParts.length > 1) {
        specs = ['test/' + queryParts[1] + 'Spec'];
    }

    return {
        specs: specs,
        mocha: mocha,
        chai: chai
    };
});
