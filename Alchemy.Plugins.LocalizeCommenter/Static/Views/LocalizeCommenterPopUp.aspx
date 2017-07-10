<%@ Page Language="C#" AutoEventWireup="true" Inherits="Tridion.Web.UI.Editors.CME.Views.Page" %>

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="LocalizerCommenterPopUp">
<head runat="server">
    <title></title>
    <cc:tridionmanager runat="server" editor="CME">
  <dependencies runat="server"> 
   <dependency runat="server">Tridion.Web.UI.Editors.CME</dependency>
   <dependency runat="server">Tridion.Web.UI.Editors.CME.commands</dependency>
   <%--<dependency runat="server">Tridion.Web.UI.Editors.CME.Views.Sites</dependency>--%>
   <dependency runat="server">Alchemy.Resources.Libs.JQuery</dependency>
   <dependency runat="server">Alchemy.Plugins.Localize_Commenter.Resources.LocalizeCommenterPopUpResources</dependency>
  </dependencies>
 </cc:tridionmanager>
    
</head>
<body>
    <form>
        <div style="width:400px;">
            <div class="content-options">
                <div style="padding-top: 5px;">
                    <label>Please provide an explanation for localizing this item:</label>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px;">
                    <textarea id="txtComments" data-lc-ajax-text-name='comments-textarea' cols="54" rows="7"></textarea>
                </div>
            </div>
            <div class="BtnWrapper">
                <div class="rightbuttons">
                    <div id="btnLocalize" data-lc-ajax-button-name='localize-button' class="button localizeCommenterPopupButton">
                        <span data-lc-ajax-text-name='localize-button-text' class="text">Localize</span>
                    </div>
                    <div id="btnCancel" data-lc-ajax-cancel-button-name='cancel-button' class="button localizeCommenterPopupButton">
                        <span class="text">Cancel</span>
                    </div>
                </div>
            </div>
        </div>

    </form>
</body>
</html>
