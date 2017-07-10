<%@ Control Language="C#" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form>

        <div class="content-options">
            <div style="padding-bottom: 5px;">
                <label><b>Localization Comments:</b></label>
            </div>
            <div>
                <textarea id="txtLocalizeComments" name="txtLocalizeComments" data-lc-ajax-text-name='comments-textarea' cols="75" rows="7"></textarea>
            </div>
            <div id="panelInformation" data-lc-ajax-infopanel-name='comments-InfoPanel' style="padding-top: 5px;">
                <div>
                    <label><b>Comments By:</b></label>
                    <label id="lblCommetsUser" data-lc-ajax-user-name='comments-user' />
                </div>
                <div>
                    <label><b>Comments Date:</b></label>
                    <label id="lblCommetsDate" data-lc-ajax-date='comments-Date' />
                </div>
            </div>
        </div>
        <br />
        <div class="rightbuttons">
            <div id="btnLocalize" data-lc-ajax-button-name='localizeComments-Update-button' class="button localizeCommenterPopupButton">
                <span data-lc-ajax-button-text-name='localizeComments-Update-button-text' class="text">Edit</span>
            </div>
            <div id="btnCancel" data-lc-ajax-cancel-button-name='localizeComments-cancel-button' class="button localizeCommenterPopupButton">
                <span class="text">Cancel</span>
            </div>
        </div>

    </form>
</body>
</html>
