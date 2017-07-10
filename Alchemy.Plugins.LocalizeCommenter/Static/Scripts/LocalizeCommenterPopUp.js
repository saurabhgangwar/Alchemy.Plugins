JQ = Alchemy.library("jQuery")
JQ(function () {

    var strItemId = getParameterByName('Uri');
    var localizeButton = JQ("div[data-lc-ajax-button-name='localize-button']");
    var cancelButton = JQ("div[data-lc-ajax-cancel-button-name='cancel-button']");
    var commentsTextBox = JQ("textarea[data-lc-ajax-text-name ='comments-textarea']");

    var ajaxLocalizeClick = function () {

        var arrItems = strItemId.split('|');

        var LocalizeCommentsModel = { itemIds: arrItems, comments: commentsTextBox.val(), appDataKey: "alchemyLocalizeCommenterPluginAppDataKey" };

        var progress = $messages.registerProgress("Localizing and adding commentes...", null);
        try {

            Alchemy.Plugins["${PluginName}"].Api.LocalizeCommenter.localizeComment(LocalizeCommentsModel)
          .success(function (data) {
              progress.finish();
              $messages.registerGoal("Localizing and adding commentes completed.");
              $models.getNavigator().refreshList();
              // JQ("span[data-lc-ajax-text-name='localize-button-text']").text("Update");
              window.close();
          })
          .error(function (type, error) {
              // first arg is string that shows the type of error ie (500 Internal), 2nd arg is object representing
              // the error.  For BadRequests and Exceptions, the error message will be in the error.message property.
              $messages.registerError("There as an error localizing and adding commentes.", error.message);

          })
          .complete(function () {
              // this is called regardless of success or failure.
              progress.finish();
          });
        }
        catch (error) {
            progress.finish();
            $messages.registerError("There as an error localizing and adding commentes..", error);
        }


        return false;
    };

    /*
    * ajaxLocalizeAndEditClick
    */

    var ajaxLocalizeAndEditClick = function () {

        var arrItems = strItemId.split('|');

        var LocalizeCommentsModel = { itemIds: arrItems, comments: commentsTextBox.val(), appDataKey: "alchemyLocalizeCommenterPluginAppDataKey" };

        var progress = $messages.registerProgress("Localizing and adding commentes...", null);
        try {

            Alchemy.Plugins["${PluginName}"].Api.LocalizeCommenter.localizeComment(LocalizeCommentsModel)
           .success(function (data) {
               // first arg in success is what's returned by your controller's action
               progress.finish();
               $messages.registerGoal("Localizing and adding commentes completed.");
               $models.getNavigator().refreshList();
               var item = $models.getItem(strItemId);
               try {
                   item.checkOut();
               }
               catch (error) {
                   //fail silently
                   //some items like taxonomies dosn't support it
               }
               var itemUrl = $display.getItemEditorUrl(item.getItemType());
               item.openInEditor(itemUrl, null, null);
               window.close();
           })
           .error(function (type, error) {
               // first arg is string that shows the type of error ie (500 Internal), 2nd arg is object representing
               // the error.  For BadRequests and Exceptions, the error message will be in the error.message property.
               $messages.registerError("There as an error localizing and adding commentes.", error.message);

           })
           .complete(function () {
               // this is called regardless of success or failure.
               progress.finish();
           });
        }
        catch (error) {
            progress.finish();
            $messages.registerError("There as an error localizing and adding commentes..", error);
        }

        return false;
    };

    var ajaxLocalizeCancelClick = function () {
        window.close();
        return false;
    };


    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    cancelButton.click(ajaxLocalizeCancelClick);
    var mode = getParameterByName('mode');



    commentsTextBox.on("keyup", function () {
        //alert(JQ("#txtComments").val().length);
        localizeButton.unbind("click");
        if (commentsTextBox.val().length > 0) {
            commentsTextBox.css('border-color', '#BBBABA');
            if (mode == "edit") {
                localizeButton.click(ajaxLocalizeAndEditClick);

            }
            else {
                localizeButton.click(ajaxLocalizeClick);

            }

        }
        else {
            // alert('enable');
            commentsTextBox.css('border-color', 'red');

        }

    });

});
