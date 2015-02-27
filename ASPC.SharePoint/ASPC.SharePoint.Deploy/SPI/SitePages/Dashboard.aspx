﻿<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:content id="Content2" contentplaceholderid="PlaceHolderPageTitle" runat="server">
    <sharepoint:encodedliteral runat="server" text="<%$Resources:wss,multipages_homelink_text%>" encodemethod="HtmlEncode" />
    -
    <sharepoint:projectproperty property="Title" runat="server" />
</asp:content>
<asp:content contentplaceholderid="PlaceHolderPageImage" runat="server"><img src="/_layouts/15/images/blank.gif?rev=23" width='1' height='1' alt="" /></asp:content>
<asp:content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
    <SharePoint:ProjectProperty Property="Title" runat="server"/>
</asp:content>
<asp:content contentplaceholderid="PlaceHolderTitleAreaClass" runat="server">
    <SharePoint:ProjectProperty Property="Title" runat="server"/>
</asp:content>
<asp:content id="Content3" contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular-route.min.js" type="text/javascript"></script>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.generics.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.stats.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:CssRegistration Name="&lt;% $SPUrl:~sitecollection/SiteAssets/css/appsters15.css %&gt;" runat="server" After="corev15.css" ></SharePoint:CssRegistration>
    <script src="https://www.google.com/jsapi" type="text/javascript" ></script>
    <meta name="CollaborationServer" content="SharePoint Team Web Site" />
</asp:content>
<asp:content contentplaceholderid="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
</asp:content>
<asp:content contentplaceholderid="PlaceHolderLeftActions" runat="server" />
<asp:content contentplaceholderid="PlaceHolderPageDescription" runat="server" />
<asp:content id="Content4" contentplaceholderid="PlaceHolderBodyAreaClass" runat="server">
    <sharepoint:styleblock runat="server">
        .ms-bodyareaframe {
	        padding: 0px;
        }
    </sharepoint:styleblock>
</asp:content>
<asp:content contentplaceholderid="PlaceHolderMain" runat="server">
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
</asp:content>
