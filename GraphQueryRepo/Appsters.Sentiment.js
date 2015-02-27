
var Appsters = Appsters || {}

Appsters.Sentiment = (function ($) {
    var sentimentUrl = "https://access.alchemyapi.com/calls/html/HTMLGetTextSentiment"; //?apikey=6e32b2999080d5258108fe9503154b5273c5e889&outputMode=json&sourceText=cleaned&html=",

    getSentimentAndLanguage = function () {
        var url = sentimentUrl;// + encodeURI(document.body.innerHTML);
        var html = $(".layoutpage-content").html();
        var jqxhr = $.post(url, { "apikey": "6e32b2999080d5258108fe9503154b5273c5e889", "outputMode": "json", "html": html }, function (data) {
            var lang = data.language;
            if (data.docSentiment) {
                var sentiment = data.docSentiment.type;
                var color = "green";
                if (sentiment == "negative") {
                    color = "red";
                    sentiment = "negative - you better do some edits!!!";
                }

                var html = "<b>Page Language:</b> " + lang + "<br><br><b>Sentiment of page is: </b><span style='color:" + color + "'>" + sentiment + "</span>";
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    var div = $("<div />");
                    div.attr("style", 'display:none;border:solid 1px #444;width:250px;position:absolute;top:100px;left:100px;background-color:#fff;padding:10px 10px 10px 10px');
                    div.html(html);

                    $("body").append(div);
                    div.fadeIn(500);
                    div.delay(5000);
                    div.fadeOut(500);
                    //SP.UI.Notify.addNotification(html, false);
                });
            }
        })
        .done(function () {
        })
        .fail(function (error) {
            console.log("error");
        });
    }

    return {
        getSentimentAndLanguage: function () {
            getSentimentAndLanguage();
        }
    };
})(jQuery);

$(document).ready(function () {
    Appsters.Sentiment.getSentimentAndLanguage();
});
