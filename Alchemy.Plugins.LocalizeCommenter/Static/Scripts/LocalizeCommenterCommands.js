Type.registerNamespace("Alchemy.LocalizeCommenter.Commands");

/**
 * Command for LocalizeComment.
 */
Alchemy.LocalizeCommenter.Commands.LocalizeComment = function () {
    Type.enableInterface(this, "Alchemy.LocalizeCommenter.Commands.LocalizeComment");
    this.addInterface("Tridion.Cme.Command", ["LocalizeComment"]);
};

Alchemy.LocalizeCommenter.Commands.LocalizeComment.prototype = {

    /**
     * Whether or not the command is available.
     */
    isAvailable: function (selection) {

        return true;

    },

    /**
     * Whether or not the command is enabled.
     */
    isEnabled: function (selection) {

        return true;
    },

    /**
     * Executes the command.
     */
    _execute: function (selection) {
        var args = { "item": selection };
        var selectedID = '';
        for (i = 0; i < selection.getItems().length; i++) {
            var item = $models.getItem(selection.getItem(i));
            //item.localize(false);
            if (i == 0) {
                selectedID = item.getId();
            }
            else {
                selectedID = selectedID + '|' + item.getId();
            }

            // console.log("item is: " + selectedID);
        }

        //var host = window.location.protocol + "//" + window.location.host;
        var url = '${ViewsUrl}LocalizeCommenterPopUp.aspx?Uri=' + selectedID;
        var popup = $popup.create(url, "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=405,height=180", null);
        popup.open();
    }
}