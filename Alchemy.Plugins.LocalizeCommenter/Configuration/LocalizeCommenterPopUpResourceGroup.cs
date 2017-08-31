using Alchemy4Tridion.Plugins.GUI.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration
{
    public class LocalizeCommenterPopUpResourceGroup : ResourceGroup
    {
        public LocalizeCommenterPopUpResourceGroup() : base("LocalizeCommenterPopUpResources")
        {
            AddFile("LocalizeCommenterPopUp.js");
            AddFile("LocalizeCommenter.css");

            // Since Alchemy comes with several libraries I can reference JQuery this way and avoid having
            // to add it myself
            Dependencies.AddLibraryJQuery();
            Dependencies.Add("Tridion.Web.UI.Editors.CME");
            Dependencies.Add("Tridion.Web.UI.Editors.CME.commands");

            AddWebApiProxy();

            AttachToView("LocalizeCommenterPopUp.aspx");

        }
    }
}
