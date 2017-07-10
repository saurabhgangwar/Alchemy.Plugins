using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy.Plugins.LocalizeCommenter.Configuration.TabPages
{
    public class LocalizeCommenterTabPage : TabPageExtension
    {
        public LocalizeCommenterTabPage()
        {
            AssignId = "AlchemyLocalizeCommenterTabPage";
            Control = "LocalizeCommenterTab.ascx";
            Name = "Localize Comments";
            PageType = "Alchemy.LocalizeCommenter.TabPage.CommentsTab";

            Dependencies.Add<LocalizeCommenterTabPageResourceGroup>();

            //TODO: Use constants for views once all the views are defined in constants.
            //For example "ComponentView" is defined as "Constants.Views.ComponentView"
            Apply.ToView("ComponentView", "MasterTabControl");
            Apply.ToView("StructureGroupView", "MasterTabControl");
            Apply.ToView("PageView", "MasterTabControl");
            Apply.ToView("FolderView", "MasterTabControl");
            Apply.ToView("CategoryView", "MasterTabControl");
            Apply.ToView("KeywordView", "MasterTabControl");
        }
    }
}
