!(function () {
    try {
        // Get the JQuery object.
        $JQ = Alchemy.library("jQuery");

        // Global variable for search text
        var searchValue = '';

        var searchAllFlag = '';

        // Get the plugin Settings
        Alchemy.Plugins["${PluginName}"].Api.getSettings()
            .success(function (settings) {
                // Read the 'SearchAllInformation' value from the settings.
                searchAllFlag = settings.SearchAllInformation;
            })
            .error(function (error) {

            });

        // Event handler function when dashboard is loaded.
        function onDashboardLoaded() {
            try {

                // Remove the event handler once the function is excuted.
                $evt.removeEventHandler($display, "start", onDashboardLoaded);

                // Get the Items list control (Tree Control)
                var filteredListControl = $display.getView().getFilteredListControl();

                var listControl = filteredListControl.getList();

                // Add a event handler when tree control's 'draw' event fired.
                // This is the event when Itemss are loaded in the tree.
                $evt.addEventHandler(listControl, "draw", addSearchBox);

                // Add a event handler when tree control's 'refresh' event fired.
                // This is the event when item list is refreshed.
                $evt.addEventHandler(listControl, "refresh", addSearchBox);

                $evt.addEventHandler(listControl, "focus", addSearchBox);

            }
            catch (error) {
                $messages.registerError("Alchemy Items Panel Search Plugin Error: ", error);
            }
        }

        // function to add search box to the list
        function addSearchBox(event) {
            try {
                
                // Get the Items list control
                var filteredListControl = this;

                // Get the element for the filtered list control element
                var filteredListControlElement = filteredListControl.getElement();

                // Search HTML template 
                var searchTemplate = "<tr class=\"AlchemyItemsPanelSearchBox\"><td colspan=\"100%\"><input id=\"AlchemyItemsPanelSearchTextBox\" type='text' placeholder='Search...'></td></tr>";

                // Get the list iframe
                var itemListIFrame = filteredListControlElement.getElementsByTagName("iframe")["FilteredItemsList_frame_details"];

                // Get the content document of the iframe
                var itemListIframeContentDocument = itemListIFrame.contentDocument;
               
                // Get the Head element of the document inside the tree control root node.
                var iFrameDocumentHeadElement = itemListIframeContentDocument.head;
                
                // Append the css file to the document head element.
                $JQ(itemListIFrame.contentDocument.head).append('<link rel="stylesheet" href="${CssUrl}ItemsPanelSearchStyle.css" type="text/css" />');

                // Get the element having "children" class of the tree control. This element have the Itemss child elements.
                var documentTbody = itemListIframeContentDocument.getElementsByTagName("tbody")[0];

                var searchBoxDiv = itemListIframeContentDocument.getElementsByClassName("AlchemyItemsPanelSearchBox");

                // Check if children element exist
                if (documentTbody != undefined) {
                    // Show search box only when Itemss are present to search
                    // and search box is not already present
                    if (searchBoxDiv.length < 1 && this.getCount() > 0) {
                        // Apply the sieve function to the children element.
                        // Set the content searchable under the TDs -> DIV having "text" class.
                        if (searchAllFlag != undefined && searchAllFlag.toLowerCase() == "true")
                        {
                            // Search all TD tags inside TR
                            $JQ(documentTbody).sieve({ searchTemplate: searchTemplate, itemSelector: "> tr.item", textSelector: "> td>div.text" });
                        }
                        else
                        {
                            // Search only second TD of TR, which is for Title of the item
                            $JQ(documentTbody).sieve({ searchTemplate: searchTemplate, itemSelector: "> tr.item", textSelector: "> td:nth-child(2)>div.text" });
                        }

                        // Set to stop immediate event propogation on keydown event.
                        // There are few keydown events (for example back space) associated with the Items tree control, So its to stop the event propagation.
                        $JQ("#AlchemyItemsPanelSearchTextBox", itemListIframeContentDocument).keydown(function (event) {
                            event.stopImmediatePropagation();
                        });
                        
                        // Set the 'searchValue' global varibale as user types in the search box and clear the selection from the list.
                        $JQ("#AlchemyItemsPanelSearchTextBox", itemListIframeContentDocument).keyup(function () { searchValue = $JQ("#AlchemyItemsPanelSearchTextBox", itemListIframeContentDocument).val(); filteredListControl.clearSelection(); });
                    }
                    
                    // We need to preserve the search value on the events other than 'draw'
                    if (event.name != 'draw') {
                        $JQ("#AlchemyItemsPanelSearchTextBox", itemListIframeContentDocument).val(searchValue);
                        $JQ("#AlchemyItemsPanelSearchTextBox", itemListIframeContentDocument).keyup();
                    }
                    else {
                        searchValue = '';
                    }
                    
                }
                else { console.warn('Alchemy Items Panel Search Plugin: Child Itemss not found'); }
            }
            catch (error) {
                $messages.registerError("Alchemy Items Panel Search Plugin Error: ", error);
            }
        }

        // Add a event handler when Dashboard display is started.
        $evt.addEventHandler($display, "start", onDashboardLoaded);
    }
    catch (error) {
        $messages.registerError("Alchemy Items Panel Search Plugin Error: ", error);
    }

})();