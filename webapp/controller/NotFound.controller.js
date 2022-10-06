sap.ui.define([
	"sap/ui/core/mvc/Controller"
],

function (Controller) {
	"use strict";

	return Controller.extend("br.com.arcelor.zbmmm0015.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed : function () {
			this.getRouter().navTo("home");
		}

	});

});