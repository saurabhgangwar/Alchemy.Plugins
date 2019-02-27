using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.ExportItemList.Config
{
    /// <summary>
    /// This class represents a group of resources, to be used by the "Export Item List" button (ribbon tool bar extension)
    /// </summary>
    public class ButtonGroup : ResourceGroup
    {
        public ButtonGroup()
        {
            // Add the JS file, which implements the command for the button
            AddFile("ExportItemListCommand.js");

            // CSS to be applied on the button
            AddFile("ToolbarButton.css");

            // Commandset used by the button
            AddFile<ExportItemListCommandSet>();
            
            // Adding Alchemy Core Resources as a dependancy
            Dependencies.AddAlchemyCore();
        }
    }
}
