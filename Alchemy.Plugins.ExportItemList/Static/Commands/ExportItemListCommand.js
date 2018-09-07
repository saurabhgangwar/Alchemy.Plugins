Alchemy.command("${PluginName}", "ExportItemList", 
{
    
    //-------------- Function:isAvailable---------
    // Returns boolean, determins if the context menu option "ExportItemList" associated with the command is available or not.
    // -------------------------------------------
	isAvailable: function(selection, pipeline)
    {
        return true;
	},
    //-------------- Function:isEnabled---------
    // Returns boolean, determins if the Ribbon Button "ExportItemList" associated with the command is enabled or not.
    // -------------------------------------------
	isEnabled: function(selection, pipeline)
    {
        return true;
    },
    //-------------- Function:init---------
    // Called when plugin is initialized
    // Reads the plugin settings and set it inside a global object
    // -------------------------------------------
    init: function() {

    },
    //-------------- Function:execute---------
    // Called when command is executed
    // -------------------------------------------
        execute: function () {
            // Get the view
            var tridionView = $display.getView();
            var xmlDoc;
            var columns;

            if (tridionView.getId() == "DashboardView") {
                var filteredListControl = tridionView.getFilteredListControl();
                var listControl = filteredListControl.getList();
                xmlDoc = listControl.getContent();
                columns = ["ID", "Title", "Type", "FromPub", "IsNew", "IsPublished", "Modified", "IsShared", "IsLocalized"];
            }
            else if (tridionView.getId() == "PublishQueueView")
            {
                var publishTransList = tridionView._getListPublishTransactions();
                xmlDoc = publishTransList.getXmlDocument();
                columns = ["ID", "Title", "ItemID", "ItemType", "State", "StateChangeDate", "TargetTypeID", "TargetTypeTitle", "Publication", "PublicationTarget", "ItemPath", "Action", "ScheduleDate", "UserId", "User", "UserDescription", "Priority", "PublisherHost", "IsCompleted", "Managed", "Allow", "Deny", "AllowedActions", "DeniedActions", "RenderingTime", "ResolvingTime", "TotalExecutionTime", "Type"];
            }
            
           
            if (confirm('Do you want to export?')) {
                this.covertXMLToCSV(xmlDoc, columns);
            }
        },

    //-------------- Function:covertXMLToCSV------
    // Converts the item list xml to CSV format
    // -------------------------------------------
    covertXMLToCSV: function (xmlDoc, columns) {
        
        var csv = [];

        var tableHeader = columns.join();

        csv.push(tableHeader);
        
        var item = xmlDoc.getElementsByTagName("tcm:Item");

        var i;
        for (i = 0; i < item.length; i++) {
            if (item[i].getAttribute("Type") != null) {
                var rowArray = [];
                var j;
                for (j = 0; j < columns.length; j++) {
                    var attribute = columns[j];
                    var attributeValue = item[i].getAttribute(attribute);
                    if (attributeValue != null) { attributeValue = attributeValue.replace(',', '|');}
                    rowArray.push(attributeValue);
                }
                csv.push(rowArray.join());
            }
        }
        if (csv.length > 1) {
            this.downloadCSV(csv.join("\n"), "ExportItemList.csv");
        }
        else {
            $messages.registerNotification("ExportItemList: There are no items to export.");
        }
    },
    //-------------- Function:downloadCSV------
    // Downloads the file
    // -------------------------------------------
    downloadCSV: function (csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    },

    });