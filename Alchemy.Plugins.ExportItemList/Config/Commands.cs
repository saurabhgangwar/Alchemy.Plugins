using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.ExportItemList.Config
{
    /// <summary>
    /// This class represents a commandset, which could be used to a resouce group.
    /// </summary>
    public class ExportItemListCommandSet : CommandSet
    {
        public ExportItemListCommandSet()
        {
            // Adding a command with the name "ExportItemList", implemented in one of the JS files(resources).
            AddCommand("ExportItemList");
        }
    }
}
