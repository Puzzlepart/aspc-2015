/// <reference path="../App.js" />
var Appsters = Appsters || {}

Appsters.Button = (function($) {
    var putTextInDocument = function () {
        var text = $("#buffer").text();
        $("#buffer").text("");
        Office.context.document.setSelectedDataAsync(text, function (result) {
            if (result.status !== Office.AsyncResultStatus.Succeeded) {
                app.showNotification('Failed to set text');
            }
        });
    }

    return {
        putTextInDocument: function (text) {
            putTextInDocument(text);
        }
    };
})(jQuery);;

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
        });
    };
})();