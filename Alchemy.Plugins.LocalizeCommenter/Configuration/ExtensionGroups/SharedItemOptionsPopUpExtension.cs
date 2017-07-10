using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alchemy4Tridion.Plugins.GUI.Configuration;
namespace Alchemy.Plugins.LocalizeCommenter.Configuration.ExtensionGroups
{
    public class SharedItemOptionsPopUpExtension : ExtensionGroup
    {
        public SharedItemOptionsPopUpExtension()
        { 
            AddExtension<SharedItemOptionsResourceGroup>("Tridion.Web.UI.Editors.CME.Views.Popups.SharedItemOptions");
        }
    }
}