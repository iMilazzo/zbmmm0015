sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "br/com/arcelor/zbmmm0015/model/models"
], function(UIComponent, Device, models) {
        'use strict';

        return UIComponent.extend("br.com.arcelor.zbmmm0015.Component",{

            metadata : {
                manifest : "json"
            },

            //INITIALIZATION
            init: function(){
                //chama superclasse
                UIComponent.prototype.init.apply(this, arguments);

                //Enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }  ,

        });
    }
);