Type.registerNamespace("Alchemy.LocalizeCommenter.TabPage");
var JQ;
var updateCommentButtonDiv;
var updateCommentButtonSpan;
var cancelButtonDiv;
var commentsTextBox;
var commentsUser;
var commentsDate;
var commentsInfoPanelDiv;

Alchemy.LocalizeCommenter.TabPage.CommentsTab = function CommentsTab$constructor(element) {

    if ($display.getItem().isLocalized()) {
        Tridion.OO.enableInterface(this, "Alchemy.LocalizeCommenter.TabPage.CommentsTab");
        this.addInterface("Tridion.Controls.DeckPage", [element]);
    }
    else {
        $css.undisplay($("#AlchemyLocalizeCommenterTabPage_switch"));
    }

};

Alchemy.LocalizeCommenter.TabPage.CommentsTab.prototype.initialize = function CommentsTab$initialize() {
    //alert('init');
    JQ = Alchemy.library("jQuery");
    commentsTextBox = JQ("textarea[data-lc-ajax-text-name ='comments-textarea']");
    updateCommentButtonDiv = JQ("div[data-lc-ajax-button-name='localizeComments-Update-button']");
    updateCommentButtonSpan = JQ("span[data-lc-ajax-button-text-name='localizeComments-Update-button-text']");
    cancelButtonDiv = JQ("div[data-lc-ajax-cancel-button-name='localizeComments-cancel-button']");
    commentsUser = JQ("label[data-lc-ajax-user-name='comments-user']");
    commentsDate = JQ("label[data-lc-ajax-Date='comments-Date']");
    commentsInfoPanelDiv = JQ("div[data-lc-ajax-InfoPanel-name='comments-InfoPanel']");
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

Alchemy.LocalizeCommenter.TabPage.CommentsTab.prototype.select = function CommentsTab$select() {
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

Alchemy.LocalizeCommenter.TabPage.CommentsTab.prototype.updateView = function CommentsTab$updateView() {
    if (this.isSelected()) {
        commentsTextBox.on("keyup", CheckForComments);
        cancelButtonDiv.click(ajaxCancelButtonClick);
        TabUpdateView();

    };
};


var TabUpdateView = function () {

    var itemId = $display.getItem().getId();
    var arrItems = [itemId];

    var LocalizeCommentsModel = { itemIds: arrItems, comments: "", appDataKey: "alchemyLocalizeCommenterPluginAppDataKey" };
   
    try {

        Alchemy.Plugins["${PluginName}"].Api.LocalizeCommenter.getLocalizeComments(LocalizeCommentsModel)
         .success(function (data) {
             ajaxSetData(data);
         })
         .error(function (type, error) {
             // first arg is string that shows the type of error ie (500 Internal), 2nd arg is object representing
             // the error.  For BadRequests and Exceptions, the error message will be in the error.message property.
             $messages.registerError("There as an error loading localizations commentes.", error);

         })
         .complete(function () {
             // this is called regardless of success or failure.
         });


    }
    catch (error) {

        $messages.registerError("There as an error loading localizations commentes.", error);
    }

    /*
    *
    */

    showView();


};

var showView = function () {
    commentsTextBox.css('border-color', '#BBBABA');
    cancelButtonDiv.hide();
    commentsInfoPanelDiv.show();
    commentsTextBox.prop('disabled', true);
    updateCommentButtonSpan.text("Edit");
    updateCommentButtonDiv.unbind("click");
    updateCommentButtonDiv.click(ajaxEditClick);
};

var showEditView = function () {
    cancelButtonDiv.show();
    commentsInfoPanelDiv.hide();
    commentsTextBox.prop('disabled', false);
    updateCommentButtonSpan.text("Update");
    updateCommentButtonDiv.unbind("click");
    updateCommentButtonDiv.click(ajaxCommentsUpdateClick);
};

var ajaxCancelButtonClick = function () {
    TabUpdateView();
};

var ajaxEditClick = function () {


    showEditView();
    return false;

}
var ajaxSetData = function (data) {
    commentsTextBox.val(data.comments);
    commentsUser.html(data.user);
    commentsDate.html(data.lastCommentDate);
};
var ajaxCommentsUpdateClick = function () {

    var itemId = $display.getItem().getId();
    var arrItems = [itemId];

    var LocalizeCommentsModel = { itemIds: arrItems, comments: commentsTextBox.val(), appDataKey: "alchemyLocalizeCommenterPluginAppDataKey" };
   

    var progress = $messages.registerProgress("Updating comments...", null);
    try {
        //*********
        Alchemy.Plugins["${PluginName}"].Api.LocalizeCommenter.localizeComment(LocalizeCommentsModel)
         .success(function (data) {
             progress.finish();
             $messages.registerGoal("Updating comments completed.");
             TabUpdateView()
         })
         .error(function (type, error) {
             // first arg is string that shows the type of error ie (500 Internal), 2nd arg is object representing
             // the error.  For BadRequests and Exceptions, the error message will be in the error.message property.
             $messages.registerError("There as an error updating comments.", error);

         })
         .complete(function () {
             // this is called regardless of success or failure.
             progress.finish();
         });
        //*********
    }
    catch (error) {
        progress.finish();
        $messages.registerError("There as an error updating comments..", error);
    }


    return false;
};


var CheckForComments = function () {

    updateCommentButtonDiv.unbind("click");
    if (commentsTextBox.val().length > 0) {
        commentsTextBox.css('border-color', '#BBBABA');
        updateCommentButtonDiv.click(ajaxCommentsUpdateClick);

    }
    else {
        // alert('enable');
        commentsTextBox.css('border-color', 'red');

    }

};

Tridion.Controls.Deck.registerPageType(Alchemy.LocalizeCommenter.TabPage.CommentsTab, "Alchemy.LocalizeCommenter.TabPage.CommentsTab");