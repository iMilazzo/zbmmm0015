sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "../model/formater"
],
function(Controller, JSONModel, MessageBox) {
    'use strict';
    return Controller.extend("br.com.arcelor.zbmmm0015.controller.App",{

            formatter: formatter,
            //-------------------------------------------------------------------------------------------------------*
            //          onInit                                                                                       *
            //-------------------------------------------------------------------------------------------------------*
            onInit: function(){
                var oModel = this.getOwnerComponent().getModel();
                this.getView().setModel(oModel);

                oModel.setHeaders({
                    "X-Requested-With" : "XMLHttpRequest"
                });

                var oTable = this.byId("smartTable");
                oTable.getTable().setSelectionMode("None");

            },
            onBeforeRendering: function(){
            },
            onAfterRendering: function(){
            },
            onExit: function(){
            },

            onSearch: function(oEvent) {
              var osmartFilter = this.getView().byId("smartFilterBar");
              var oDocData = osmartFilter.getControlByKey("Docdat");
              var oMatData = osmartFilter.getControlByKey("Docmatdata");
              
              if(oDocData.getValue() === "" && oMatData.getValue() === "" ){
                MessageBox.error("Informar ao menos um parâmetro de data");
              }
              if(oDocData.getValue() !== "" && oMatData.getValue() !== "" ){
                MessageBox.error("Informar somente um parâmetro de data");
              }
            },

            //-------------------------------------------------------------------------------------------------------*
            //          onInitializedSmartFilterBar                                                                  *
            //-------------------------------------------------------------------------------------------------------*
            onInitializedSmartFilterBar:function(){
              var osmartFilter = this.getView().byId("smartFilterBar");
              var oTipoRel = osmartFilter.getControlByKey("TipoRel");
              //oTipoRel.setValue("Analítico");

              this._definirColunas('A');
              var osmartFilter = this.getView().byId("smartFilterBar");
              var oDefaultFilter = {
                "TipoRel" : {
                  "ranges":[
                    {
                      "exclude":false,
                      "operation":"EQ",
                      "keyField":"TipoRel",
                      "value1":"A"
                    }
                  ]
                 }
                };
                osmartFilter.setFilterData(oDefaultFilter);

                //Definir valor default para o filtro de Centro
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/ShPlantSet",{
                  success: function(oData) {
                    if (oData.results.length == 1){
                      var oDefaultFilter = {
                        "Werks" : {
                          "ranges":[
                            {
                              "exclude":false,
                              "operation":"EQ",
                              "keyField":"Werks",
                              "value1":oData.results[0].Plant
                            }
                          ]
                        }
                      };
                      osmartFilter.setFilterData(oDefaultFilter);
                    }
                  }.bind(this),
                  error: function(error) {
                    console.log("Erro ShPlantSet read");
                  }.bind(this)
                });
            },

          //-------------------------------------------------------------------------------------------------------*
          //          onfilterChange                                                                               *
          //-------------------------------------------------------------------------------------------------------*
            onfilterChange: function(oControlEvent) {

              var oFilter = this.getView().byId("smartFilterBar").getFilterData();

              if (oControlEvent.getParameters().sId == "change") {
                var sId = oControlEvent.getParameters().getParameters().id;
                if (sId.endsWith("TipoRel") == true) {
                    this._definirColunas(oFilter.TipoRel);
                };
            } else {
                if (oControlEvent.sId == 'filterChange'){
                    var sTipoRel = "";
                    if (typeof(oFilter.TipoRel) != 'undefined'){
                        sTipoRel = oFilter.TipoRel;
                    };
                    this._definirColunas(sTipoRel);
                };
              };

            },

            //-------------------------------------------------------------------------------------------------------*
            //          onDataReceived                                                                               *
            //-------------------------------------------------------------------------------------------------------*
            onDataReceived: function(oEvent) {
              var sTipoRel = this.getView().byId("smartFilterBar").getFilterData().TipoRel;
              this._definirColunas(sTipoRel);
            },

            //-------------------------------------------------------------------------------------------------------*
            //          _definirColunas                                                                              *
            //-------------------------------------------------------------------------------------------------------*
            _definirColunas: function(sTipoRel) {

              var oTable = this.byId("smartTable");
              var sHeaderText = "";

              if ( sTipoRel == 'A') {
                var aCols = ["Nfnum", "Series", "Docnum", "Docdat", "Parid", "Name1", "Itmnum", "Bwart", "Werks", "Matnr", "Maktx", "AgrupamentoProduto", "LinhaProduto", "Menge", "Netpr", "Netwr", "Ebeln", "Ebelp", "Refkey", "Refitm", "Usnam", "DocnumRef", "NfenumRef", "SeriesRef", "Itmnumref", "ParidRef"];
                sHeaderText = this.getView().getModel("i18n").getResourceBundle().getText("stAnaliticoHeader");
              }
              else if ( sTipoRel == 'S') {
                var aCols = ["Nfnum", "Series", "Matnr", "QtdEnvio", "QtdSaldo", "Qtd543", "Qtd101", "Qtd542", "Qtd309","QtdZs9", "Status"];
                sHeaderText = this.getView().getModel("i18n").getResourceBundle().getText("stSinteticoHeader");
              };

              oTable.setHeader(sHeaderText);

              var i = 0;
              oTable.getTable().getColumns().forEach(function(oLine) {
                  var scolId = oLine.getId();
                  var iPos = scolId.indexOf('Home--smartTable');
                  iPos = iPos + 17 - scolId.length;
                  var sIdsubstr = scolId.slice(iPos);

                  if (aCols.includes(sIdsubstr)){
                    oLine.setVisible(true);
                  }
                  else {
                    oLine.setVisible(false);
                  };

                  switch(sIdsubstr) {
                    case "Nfnum":
                      oLine.setWidth("100px");
                      break;
                    case "Docnum":
                      oLine.setWidth("100px");
                      break;
                    case "Parid":
                      oLine.setWidth("100px");
                      break;
                    case "Itmnum":
                      oLine.setWidth("80px");
                      break;
                    case "Matnr":
                      oLine.setWidth("150px");
                      break;
                    case "Maktx":
                      oLine.setWidth("350px");
                      break;
                    case "Menge":
                      oLine.setWidth("150px");
                      break;
                    case "Netpr":
                      oLine.setWidth("150px");
                      break;
                    case "Netwr":
                      oLine.setWidth("150px");
                      break;
                    case "Ebeln":
                      oLine.setWidth("100px");
                      break;
                    case "Ebelp":
                      oLine.setWidth("60px");
                      break;
                    case "Refkey":
                      oLine.setWidth("180px");
                      break;
                    case "Refitm":
                      oLine.setWidth("80px");
                      break;
                    case "Usnam":
                      oLine.setWidth("100px");
                      break;
                    case "DocnumRef":
                      oLine.setWidth("100px");
                      break;
                    case "NfenumRef":
                      oLine.setWidth("100px");
                      break;
                    case "SeriesRef":
                    case "Itmnumref":
                      oLine.setWidth("60px");
                      break;
                    case "ParidRef":
                      oLine.setWidth("100px");
                      break;
                    case  "QtdEnvio":
                      oLine.setWidth("150px");
                      break;
                    case "QtdSaldo":
                      oLine.setWidth("150px");
                      break;
                    case "Qtd543":
                      oLine.setWidth("150px");
                      break;
                    case "Qtd101":
                      oLine.setWidth("150px");
                      break;
                    case "Qtd542":
                      oLine.setWidth("200px");
                      break;
                    case "Qtd309":
                      oLine.setWidth("150px");
                      break;
                    case "Status":
                      oLine.setWidth("100px");
                      break;
                    };

               i++;
              });
            }

        });
});