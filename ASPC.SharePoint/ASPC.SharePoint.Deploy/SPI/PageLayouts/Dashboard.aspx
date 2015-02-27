<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular-route.min.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/jquery-2.1.3.min.js" type="text/javascript"></script>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.generics.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.enemies.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
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
            <div class="stats-object" ng-controller="contentTypesChartCtrl" style="margin-right:20px">
                <h2 class="ms-webpart-titleText">Content Type Distribution</h2>
                <div id="content-type-chart"></div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        Appsters.Stats.InitPage();
    </script>
</asp:Content>
