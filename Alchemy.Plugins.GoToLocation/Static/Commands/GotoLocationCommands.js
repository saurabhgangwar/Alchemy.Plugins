/**
 * Creates an anguilla command using a wrapper shorthand.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name.
 */
Alchemy.command("${PluginName}", "GoToLocationCommand", {
     /**
     * Whether or not the command is enabled for the user (will usually have extensions displayed but disabled).
     * @returns {boolean}
     */
    isEnabled: function () {
        return true;
    },

    /**
     * Whether or not the command is available to the user.
     * @returns {boolean}
     */
    isAvailable: function () {
        return true;
    },

    execute: function (selection) {
        //var itemUri = selection.getItem(0);
        //var item = $models.getItem(itemUri);
        $cme.getCommand("Goto")._execute(selection);
        
    }
});