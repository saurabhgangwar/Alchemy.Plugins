using Alchemy4Tridion.Plugins.GUI.Configuration;
using Alchemy4Tridion.Plugins.GUI.Configuration.Elements;

namespace Alchemy.Plugins.ItemsPanelSearch.Config
{
    /// <summary>
    /// Represents the ResourceGroup element within the editor configuration that contains this plugin's files
    /// and references.
    /// </summary>
    public class ItemsPanelSearchResourceGroup : ResourceGroup
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public ItemsPanelSearchResourceGroup()
        {

            // When adding files you only need to specify the filename and not full path
            AddFile("sieve.js");
            AddFile("ItemsPanelSearch.js");
            AddFile("ItemsPanelSearchStyle.css");

            AddWebApiProxy();
            // Adding the JQuery dependancy
            Dependencies.AddLibraryJQuery();
            //Dependencies.AddAlchemyCore();

        }
    }
}
