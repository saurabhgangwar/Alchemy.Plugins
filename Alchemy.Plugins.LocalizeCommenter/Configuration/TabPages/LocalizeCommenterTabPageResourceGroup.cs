using Alchemy4Tridion.Plugins.GUI.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration.TabPages
{
    public class LocalizeCommenterTabPageResourceGroup : ResourceGroup
    {
        public LocalizeCommenterTabPageResourceGroup()
            : base("LocalizeCommenterTabPageResources")
        {
            AddFile("LocalizeCommenterTabPage.js");
            AddFile("LocalizeCommenter.css");
            AddWebApiProxy();
            Dependencies.AddLibraryJQuery();
        }
    }
}
