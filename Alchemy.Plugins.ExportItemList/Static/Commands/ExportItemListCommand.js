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
            //p.popup.open();
            var filteredListControl = $display.getView().getFilteredListControl();
            var listControl = filteredListControl.getList();
            var xmlDoc = listControl.getContent();
            //searchXML = cnt.documentElement;


            if (confirm('Do you want to export?')) {
                this.covertXMLToCSV(xmlDoc);
            }
        },


    covertXMLToCSV: function (xmlDoc) {
        var i;

        var csv = [];

        var tableHeader = "ID,Title,Type,FromPub,IsNew,IsPublished,Modified,IsShared,IsLocalized";

        csv.push(tableHeader);
        
        var x = xmlDoc.getElementsByTagName("tcm:Item");
        
        for (i = 0; i < x.length; i++) {
            if (x[i].getAttribute("Type") != null) {
                var row = x[i].getAttribute("ID") +
                    "," +
                    x[i].getAttribute("Title") +
                    "," +
                    x[i].getAttribute("Type") +
                    "," +
                    x[i].getAttribute("FromPub") +
                    "," +
                    x[i].getAttribute("IsNew") +
                    "," +
                    x[i].getAttribute("IsPublished") +
                    "," +
                    x[i].getAttribute("Modified") +
                    "," +
                    x[i].getAttribute("IsShared") +
                    "," +
                    x[i].getAttribute("IsLocalized");

                csv.push(row);
            }
        }
        if (csv.length > 1) {
            this.downloadCSV(csv.join("\n"), "ExportItemList.csv");
        }
        else {
            $messages.registerNotification("ExportItemList: There are no items to export.");
        }
    },

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