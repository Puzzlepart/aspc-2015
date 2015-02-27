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
<h1>Browse people of the empire</h1>
    <div class="appsters enemies" ng-app="StatisticsAngularApp">
        <div ng-controller="enemiesListCtrl">
            <div class="character target" ng-repeat="character in people">  
                <div class="target-image">
                    <img src="{{character.imageUrl}}"/>
                </div>
                <div class="nameAndInfo target-content">
                    <h2 class="name">{{character.name}}</h2>
                    <div class="keyData">
                        <span>Birth year: {{character.birth_year}}</span>
                        <span>Gender: {{character.gender}}</span>
                        <span>Skin color: {{character.skin_color}}</span>
                        <span>Hair color: {{character.hair_color}}</span>
                    </div>
                    <div class="actions">
                        <div id="AddWanted">Add as Wanted</div>
                    </div>
                </div>
            </div> 
            <div class="paging">
                <div id="previous">Previous</div>
                <div id="next">Next</div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        Appsters.Enemies.InitPage();
    </script>
</asp:Content>
