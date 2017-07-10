Type.registerNamespace("Alchemy.LocalizeCommenter.ResourceExtensions");

/**
 * Represents functionality for adding custom functionality on SharedItemOptions Popup dialog.
 */
Alchemy.LocalizeCommenter.ResourceExtensions.SharedItemOptions = {

    init: function () {
        
        var defaultOnOK = Tridion.Cme.Views.SharedItemOptions.prototype._onOkButtonClicked;

        Tridion.Cme.Views.SharedItemOptions.prototype._onOkButtonClicked = function () {
            var r = this.properties.controls.radio;

            var localizeEditIndex;
            for (var i = 0 ; i < r.length; i++) {
                if (r[i].id == 'localizeedit') {
                    localizeEditIndex = i;
                }
            }

            if (r[localizeEditIndex].checked) {
                var dialogArgs = this.getDialogArguments() || {};
                var item = dialogArgs.item;

                //CALL OPEN DIALOG
                Alchemy.LocalizeCommenter.ResourceExtensions.SharedItemOptions.showLocalizeCommentsDialog(item);
                //FIRE EVENT FOR CANCEL
                this.fireEvent("cancel");
            }
            else {
                defaultOnOK.apply(this, arguments);
            }
        }

    },


    showLocalizeCommentsDialog: function (item) {

        var url = '${ViewsUrl}/LocalizeCommenterPopUp.aspx?mode=edit&Uri=' + item.getId();
        var popup = $popup.create(url, "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=400,height=180", null);
        popup.open();
    }

};

// We call init only after document has loaded.
$jq = Alchemy.library("jQuery");
$jq(function () {
    Alchemy.LocalizeCommenter.ResourceExtensions.SharedItemOptions.init();
});











