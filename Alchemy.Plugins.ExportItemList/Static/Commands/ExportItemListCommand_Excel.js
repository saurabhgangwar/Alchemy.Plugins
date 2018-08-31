Alchemy.command("${PluginName}", "ExportItemList", 
{
    
    //-------------- Function:isAvailable---------
    // Returns boolean, determins if the context menu option "Add User By Name Plus" associated with the command is available or not.
    // -------------------------------------------
	isAvailable: function(selection, pipeline)
    {
        //if (this.isUserAllowed()) {
        //    return $commands.getCommand("NewUser").isAvailable(selection, pipeline);
        //}
        return true;
	},
    //-------------- Function:isEnabled---------
    // Returns boolean, determins if the Ribbon Button "Add User By Name Plus" associated with the command is enabled or not.
    // -------------------------------------------
	isEnabled: function(selection, pipeline)
    {
        //if (this.isUserAllowed()) {
        //    return $commands.getCommand("NewUser").isEnabled(selection, pipeline);
        //}
        return true;
    },
    //-------------- Function:init---------
    // Called when plugin is initialized
    // Reads the plugin settings and set it inside a global object
    // -------------------------------------------
    init: function() {
/*
        // Get the plugin Settings
        Alchemy.Plugins["${PluginName}"].Api.getSettings()
            .success(function (settings) {
                
                AddUserByNamePlusPluginSettings = settings;
            })
            .error(function (error) {
                $messages.registerError('Add User By Name Plus', 'There was a problem obtaining the configuration settings, please check plugin settings within Alchemy', false);
            });
            */
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
                this.covertXMLToHTML(xmlDoc);
            }
        },

        covertXMLToHTML: function (xmlDoc) {
            var i;
            //var xmlDoc = xml.responseXML;
            //var parser = new DOMParser();
            //var xmlDoc = parser.parseFromString(xml,"text/xml");
            var table = "<table><tr><th>ID</th><th>Title</th><th>Type</th><th>FromPub</th><th>IsNew</th><th>IsPublished</th><th>Modified</th><th>IsShared</th><th>IsLocalized</th></tr>";
            //var table="";
            var x = xmlDoc.getElementsByTagName("tcm:Item");
            //alert(x.length);
            for (i = 0; i < x.length; i++) {
                table += "<tr><td>" +
                    x[i].getAttribute("ID") +
                    "</td><td>" +
                    x[i].getAttribute("Title") +
                    "</td><td>" +
                    x[i].getAttribute("Type") +
                    "</td><td>" +
                    x[i].getAttribute("FromPub") +
                    "</td><td>" +
                    x[i].getAttribute("IsNew") +
                    "</td><td>" +
                    x[i].getAttribute("IsPublished") +
                    "</td><td>" +
                    x[i].getAttribute("Modified") +
                    "</td><td>" +
                    x[i].getAttribute("IsShared") +
                    "</td><td>" +
                    x[i].getAttribute("IsLocalized") +
                    "</td>" +
                    "</tr>";
            }
            table += "</table>";

            this.exportTableToExcel(table);
        },

        exportTableToExcel: function (tableHTML, filename = '') {
            var downloadLink;
            var dataType = 'application/vnd.ms-excel';
            //var tableSelect = document.getElementById(tableID);
            myTable = tableHTML;
            var tableHTML = tableHTML.replace(/ /g, '%20');

            // Specify file name
            filename = filename ? filename + '.xls' : 'excel_data.xls';

            // Create download link element
            downloadLink = document.createElement("a");

            document.body.appendChild(downloadLink);

            if (navigator.msSaveOrOpenBlob) {
                var blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

                // Setting the file name
                downloadLink.download = filename;

                //triggering the function
                downloadLink.click();
            }
        }
    });