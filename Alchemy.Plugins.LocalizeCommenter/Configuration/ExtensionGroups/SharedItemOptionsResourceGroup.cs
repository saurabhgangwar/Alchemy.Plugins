using Alchemy4Tridion.Plugins.GUI.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration.ExtensionGroups
{
    public class SharedItemOptionsResourceGroup : ResourceGroup
    {
        public SharedItemOptionsResourceGroup()
            : base("SharedItemOptionsExtensionGroup")
        {
            AddFile("SharedItemOptionsExtension.js");
           // AddFile<LocalizeCommenterCommandSet>();
            Dependencies.AddLibraryJQuery();
            
          
        }
    }
}
