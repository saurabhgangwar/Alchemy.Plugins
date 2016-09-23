using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy.Plugins.ItemsPanelSearch.Config
{
    /// <summary>
    /// Represents a Extension Group.
    /// </summary>
    public class ItemsPanelSearchExtensionGroup : ExtensionGroup
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public ItemsPanelSearchExtensionGroup()
        {
            // Add the "ItemsPanelSearchResourceGroup" resource group as Extension to extend the resource "Tridion.Web.UI.Editors.CME.Views.Dashboard"
            AddExtension<ItemsPanelSearchResourceGroup>("Tridion.Web.UI.Editors.CME.Views.Dashboard");
        }
    }
}
