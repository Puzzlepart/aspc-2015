var Appsters = Appsters || {}

Appsters.Graph = (function ($) {
    var actors = [],

    getMostModified = function (callbackModified, from, to) {
        var parts = [];
        //OR(ACTOR(1234, action:1003), ACTOR(5678, action:1003))
        for (var i = 0; i < actors.length; i++) {
            parts.push("ACTOR(" + actors[i].docId + "\\, action\\:1003)");
        }
        var graphQuery = "OR(" + parts.join("\\,") + ")";

        var queryText = "*";
        if (from != null && to != null) {
            var fromString = (from.getYear() + 1900) + "-" + (from.getMonth() + 1) + "-" + from.getDate();
            var toString = (to.getYear() + 1900) + "-" + (to.getMonth() + 1) + "-" + to.getDate();
            queryText = "write>" + fromString + " AND write<" + toString;
        }

        var queryUrl = "/_api/search/query?querytext='" + queryText + "'&rowlimit=500&properties='GraphQuery:" + graphQuery + ",GraphRankingModel:{\"features\"\\:[{\"function\"\\:\"EdgeWeight\"}]}'&rankingmodelid='0c77ded8-c3ef-466d-929d-905670ea1d72'";
        var mostModified = [];

        $.ajax({
            url: queryUrl,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (d) {
                if (d.d.query.PrimaryQueryResult != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results.length > 0) {
                    $(d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results).each(function (i, row) {
                        mostModified.push(parseActorResults(row));
                    });
                }

                // group modifications per user
                var groupIt = {};
                var count = 0;
                $(mostModified).each(function (o, a) {
                    var actorID = a.actorId;
                    var actor = $.grep(actors, function (e) { return e.docId == actorID; });
                    if (groupIt[actor[0].title] == null) {
                        groupIt[actor[0].title] = a.edgeWeight;
                        count++;
                    } else {
                        groupIt[actor[0].title] += a.edgeWeight;
                    }
                });

                callbackModified(groupIt);
            },
            error: function (err) {
                showMessage('<div id="private" class="message">Error calling Office Graph for actors...refresh your browser and try again (<span class="hyperlink" onclick="javascript:$(this).parent().remove();">dismiss</span>).</div>');
            }
        });
    },

    getMostViewed = function (from, to) {

    },

    getAllActors = function (callbackLoadActors) {
        // /_api/search/query?querytext='*'&selectproperties='workid%2cPreferredName'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'
		var deferred = jQuery.Deferred();
        $.ajax({
            url: "/_api/search/query?querytext='*'&rowlimit=200&selectproperties='workid%2cPreferredName'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'",
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (d) {
                if (d.d.query.PrimaryQueryResult != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results != null &&
                   d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results.length > 0) {
                    $(d.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results).each(function (i, row) {
                        actors.push(parseActorResults(row));
                    });
                }

                //aLoaded = true;
                //if (oLoaded)
                //    callback(children);
                typeof callbackLoadActors === 'function' && callbackLoadActors(actors);
				deferred.resolve()
            },
            error: function (err) {
                showMessage('<div id="private" class="message">Error calling Office Graph for actors...refresh your browser and try again (<span class="hyperlink" onclick="javascript:$(this).parent().remove();">dismiss</span>).</div>');
            }
        });
		return deferred.promise();
    },

    parseActorResults = function (row) {
        var o = {};
        o.type = 'actor';
        $(row.Cells.results).each(function (ii, ee) {
            if (ee.Key == 'PreferredName')
                o.title = ee.Value;
            else if (ee.Key == 'PictureURL')
                o.pic = ee.Value;
            else if (ee.Key == 'JobTitle')
                o.text1 = ee.Value;
            else if (ee.Key == 'Department')
                o.text2 = ee.Value;
            else if (ee.Key == 'Path')
                o.path = ee.Value;
            else if (ee.Key == 'DocId')
                o.docId = ee.Value;
            else if (ee.Key == 'Rank')
                o.rank = parseFloat(ee.Value);
            else if (ee.Key == 'Edges') {
                //get the highest edge weight
                var edges = JSON.parse(ee.Value);
                o.objectId = edges[0].ObjectId;
                o.actorId = edges[0].ActorId;
                $(edges).each(function (i, e) {
                    var w = parseInt(e.Properties.Weight);
                    if (o.edgeWeight == null || w > o.edgeWeight)
                        o.edgeWeight = w;
                });
            }
        });
        return o;
    }

    return {
        getMostModified: function (callback) {
            return getMostModified(callback);
        },
        getMostViews: function (from, to) {
            return getMostViews(from, to);
        },
        getAllActors: function () {
            return getAllActors();
        }
    };
})(jQuery);

// usage example
//	Appsters.Graph.getAllActors().done(function(){
//		Appsters.Graph.getMostModified(function(data){
//			console.log(data);
//		});
//	});

