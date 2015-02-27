<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['corechart','table']}]}"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular-route.min.js" type="text/javascript"></script>
	<script src="../SiteAssets/js/Appsters.OfficeGraph.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/jquery-2.1.3.min.js" type="text/javascript"></script>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.generics.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.stats.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:CssRegistration Name="&lt;% $SPUrl:~sitecollection/SiteAssets/css/appsters15.css %&gt;" runat="server" After="corev15.css" ></SharePoint:CssRegistration>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitleInTitleArea" runat="server"> </asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"> </asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
    <div class="appsters" ng-app="StatisticsAngularApp">
        <div class="stats-row">
            <div class="stats-object" ng-controller="contentTypesChartCtrl" style="width: 33%;float: left;">
                <h2 class="ms-webpart-titleText">Content Type Distribution</h2>
                <div id="content-type-chart"></div>
            </div>
			<div class="stats-object" style="width: 33%;float: left;">
                <h2 class="ms-webpart-titleText">Users With Most Modifications</h2>
                <div id="piechart" style="height: 300px;"></div>
            </div>
			<div class="stats-object" style="width: 30%; text-align:left;">
                <h2 class="ms-webpart-titleText">Most Modified Documents</h2>
                <div id="barchart" style="" ></div>
            </div>
			
		</div>
	</div>
    
    <script type="text/javascript">
        Appsters.Stats.InitPage();
    </script>
	<script type="text/javascript">

	    Appsters.Graph.getAllActors().done(function () {
	        Appsters.Graph.getMostModified(function (personEditsAggregate, mostModifiedDocs) {
	            google.setOnLoadCallback(drawCharts(personEditsAggregate, mostModifiedDocs));
	        });
	    });

	    function drawCharts(personEditsAggregate, mostModifiedDocs) {
	        drawPieChart(personEditsAggregate);
	        drawTable(mostModifiedDocs);
	    }

	    function drawPieChart(data) {
	        var stagingArray = [["Name", "Modified"]];
	        for (var key in data) {
	            stagingArray.push([key, data[key]]);
	        }
	        var dataTable = google.visualization.arrayToDataTable(stagingArray);
	        var options = {
	            'height': 300,
	            'chartArea': { 'width': '100%', 'height': '80%' },
	            'colors': ['#003045', '#ff8000', '#88959f', '#5bc6e8', '#dc241e', '#b9c1c6'],
	            'is3D': true
	        };
	        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	        chart.draw(dataTable, options);
	    }

	    function drawTable(data) {
	        console.log(data);
	        var stagingArray = [["Document", "Weight"]];
	        for (var key in data) {
	            var documentName = data[key].path.substr(data[key].path.lastIndexOf("/") + 1)
	            stagingArray.push(['<a href="' + data[key].path + '">' + documentName + '</a>', data[key].edgeWeight]);
	        }

	        var dataTable = google.visualization.arrayToDataTable(stagingArray);
	        var options = {
	            'allowHtml': true,
	            'page': 'enable',
	            'pageSize': 10,
	            'showRowNumber': true
	        };
	        var chart = new google.visualization.Table(document.getElementById('barchart'));
	        chart.draw(dataTable, options);

	    }

</script>

</asp:Content>
