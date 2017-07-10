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
        public LocalizeCommenterPopUpResourceGroup()
            : base("LocalizeCommenterPopUpResources")
        {
            AddFile("LocalizeCommenterPopUp.js");
            AddFile("LocalizeCommenter.css");
            AddWebApiProxy();
           
        }
    }
}
