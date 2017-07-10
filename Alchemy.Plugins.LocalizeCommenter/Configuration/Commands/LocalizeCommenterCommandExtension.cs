using Alchemy4Tridion.Plugins.GUI.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration.Commands
{
    public class LocalizeCommenterCommandExtension : CommandExtension
    {
        public LocalizeCommenterCommandExtension()
        {
            Name = "Localize";

            ExtendingCommand = "LocalizeComment";
          
            Dependencies.Add<LocalizeCommenterResourceGroup>();
            
        }
    }
}
