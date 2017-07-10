using Alchemy4Tridion.Plugins.GUI.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration.Commands
{
    public class LocalizeCommenterResourceGroup : ResourceGroup
    {
        public LocalizeCommenterResourceGroup()
            : base("LocalizeCommenterCommands")
        {
            AddFile("LocalizeCommenterCommands.js");

            AddFile<LocalizeCommenterCommandSet>();
        }
    }
}
