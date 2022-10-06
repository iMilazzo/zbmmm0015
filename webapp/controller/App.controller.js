sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function(Controller) {
    'use strict';
    return Controller.extend("br.com.arcelor.zbmmm0015.controller.App",{

        //INITIALIZATION
        onInit: function(){
            console.log("Current Locale: " + sap.ui.getCore().getConfiguration().getLanguage());
        },

        onBeforeRendering: function(){},
        onAfterRendering: function(){},
        onExit: function(){}
    });
});