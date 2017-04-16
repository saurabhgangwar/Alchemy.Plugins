using Alchemy4Tridion.Plugins.GUI.Configuration;
using Alchemy4Tridion.Plugins.GUI.Configuration.Elements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.GoToLocation.Config
{
    class GoToLocationResouceGroup : ResourceGroup
    {
        public GoToLocationResouceGroup()
        {
            AddFile("GotoLocationCommands.js");
            AddFile("GoToLocation.css");
            AddFile<GoToLocationCommandSet>();
            Dependencies.AddAlchemyCore();

            // Adding Web API Proxy
            //AddWebApiProxy();

            // Adding the JQuery dependancy
            Dependencies.AddLibraryJQuery();
        }
    }
}
