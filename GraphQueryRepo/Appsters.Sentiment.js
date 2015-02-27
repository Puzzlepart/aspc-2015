
var Appsters = Appsters || {}

Appsters.Sentiment = (function ($) {
    var sentimentUrl = "https://access.alchemyapi.com/calls/html/HTMLGetTextSentiment"; //?apikey=6e32b2999080d5258108fe9503154b5273c5e889&outputMode=json&sourceText=cleaned&html=",

    getSentimentAndLanguage = function () {
        var url = sentimentUrl;// + encodeURI(document.body.innerHTML);
        var jqxhr = $.post(url, { "apikey": "6e32b2999080d5258108fe9503154b5273c5e889", "outputMode": "json", "sourceText": "cleaned", "html": $("#s4-bodyContainer").text() }, function (data) {
            var lang = data.language;
            var sentiment = data.docSentiment.type;
            var color = "green";
            if (sentiment == "negative") {
                color = "red";
            }

            var html = "<b>Page Language:</b> " + lang + "<br><br><div style='color:" + color + "'>" + sentiment + "</div>";
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                var div = $("<div />");
                div.attr("style", 'display:none;border:solid 1px #444;width:250px;position:absolute;top:100px;left:100px;background-color:#fff;padding:10px 10px 10px 10px')
                div.html(html);

                $("body").append(div);
                div.fadeIn(500).delay(5000).fadeOut(500).remove();
                //SP.UI.Notify.addNotification(html, false);
            });
        })
        .done(function () {
        })
        .fail(function (error) {
            alert(error);
        });
    }

    return {
        getSentimentAndLanguage: function () {
            getSentimentAndLanguage();
        }
    };
})(jQuery);

Appsters.Sentiment.getSentimentAndLanguage();