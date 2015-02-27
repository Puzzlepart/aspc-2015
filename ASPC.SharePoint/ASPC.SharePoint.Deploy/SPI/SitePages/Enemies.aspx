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
    <script src="https://code.jquery.com/jquery-2.1.3.min.js" type="text/javascript"></script>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.generics.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/js/appsters.enemies.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:CssRegistration Name="&lt;% $SPUrl:~sitecollection/SiteAssets/css/appsters15.css %&gt;" runat="server" After="corev15.css" ></SharePoint:CssRegistration>
</asp:content>
<asp:content contentplaceholderid="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
</asp:content>
<asp:content contentplaceholderid="PlaceHolderLeftActions" runat="server" />
<asp:content contentplaceholderid="PlaceHolderPageDescription" runat="server" />
<asp:content id="Content4" contentplaceholderid="PlaceHolderBodyAreaClass" runat="server">
</asp:content>
<asp:content contentplaceholderid="PlaceHolderMain" runat="server">
    <div class="appsters enemies" ng-app="StatisticsAngularApp">
        <div ng-controller="enemiesListCtrl">
            <div class="character" ng-repeat="character in people">  
                <div class="image"><img src="{{character.imageUrl}}"/></div>
                <div class="nameAndInfo">
                    <div class="name">{{character.name}}</div>
                    <div class="keyData">
                        <span>Birth year: {{character.birth_year}}</span>
                        <span>Gender: {{character.gender}}</span>
                    </div>
                    <div class="actions">
                        <button id="AddWanted">Add as Wanted</button>
                    </div>
                </div>
            </div> 
            <button id="previous">Previous</button>
            <button id="next">Next</button>
        </div>
    </div>
    <script type="text/javascript">
        Appsters.Enemies.InitPage();
    </script>
</asp:content>
