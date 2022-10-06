sap.ui.define([
    "sap/ui/core/mvc/XMLView",
    "sap/ui/core/ComponentContainer"
    ],
    function(XMLView,ComponentContainer) {

        'use strict';

    // Usando o Component
    new ComponentContainer({
        name: "br.com.arcelor.zbmmm0015",
        settings: {
        id: "webapp"
        },
        async : true
    }).placeAt("content");

});