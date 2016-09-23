!(function () {
    try{
        // Get the JQuery object.
        $JQ = Alchemy.library("jQuery");
        
        // Event handler function
        function onDashboardLoaded() {
            try{
            // Remove the event handler once the function is excuted.
            $evt.removeEventHandler($display, "start", onDashboardLoaded);
            // Get the publication list control (Tree Control)
            var treeControl = $display.getView().getTreeControl();
            // Add a event handler when tree control's 'draw' event fired.
            // This is the event when publications are loaded in the tree.
            $evt.addEventHandler(treeControl, "draw", addSearchBox);
            }
            catch (error) {
                $messages.registerError("Alchemy Publication Panel Search Plugin Error: ", error);
            }
        }

        function addSearchBox()
        {
            try{
            // Get the publication list control (Tree Control)
            var treeControl = $display.getView().getTreeControl();

            // Get the element for the tree control
            var treeControlElement = treeControl.getElement();

            // Fet the Head element of the document inside the tree control root node.
            var treeDocumentHeadElement = treeControl.getRootNode().ownerDocument.head;

            // Append the css file to the document head element.
            $JQ(treeDocumentHeadElement).append('<link rel="stylesheet" href="${CssUrl}Style.css" type="text/css" />');

            // Search HTML template 
            var searchTemplate = "<div class=\"alchemyPublicationSearchBox\"><input id=\"AlchemyPublicationSearchTextBox\" type='text' placeholder='Search...'></div>";

            // Get the element having "children" class of the tree control. This element have the publications child elements.
            var childDiv = treeControlElement.getElementsByClassName("children")[0];

            var nodePublicationElements = childDiv.getElementsByClassName("node");

            var searchBoxDiv = treeControlElement.getElementsByClassName("alchemyPublicationSearchBox");

            // Check if children element exist
            if (childDiv != undefined) {
                // Show search box only when publications are present to search
                // and search box is not already present
                if (nodePublicationElements.length > 0 && searchBoxDiv.length < 1) {
                    // Apply the sieve function to the children element.
                    // Set the content searchable under the DIVs having "node" class.
                    $JQ(childDiv).sieve({ searchTemplate: searchTemplate, itemSelector: "> div.node", textSelector: "> div.header div.title" });

                    // Set to stop immediate event propogation on keydown event.
                    // There are few keydown events (for example back space) associated with the publication tree control, So its to stop the event propagation.
                    $JQ("#AlchemyPublicationSearchTextBox", treeControlElement).keydown(function (event) {
                        event.stopImmediatePropagation();
                    });
                }

            }
            else { console.warn('Alchemy Publication Panel Search Plugin: Child publications not found'); }
            }
            catch (error) {
                $messages.registerError("Alchemy Publication Panel Search Plugin Error: ", error);
            }
        }

        // Add a event handler when Dashboard display is started.
        $evt.addEventHandler($display, "start", onDashboardLoaded);
    }
    catch (error) {
        $messages.registerError("Alchemy Publication Panel Search Plugin Error: ", error);
    }


})();