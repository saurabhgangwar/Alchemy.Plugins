using Alchemy.Plugins.ExportItemList;
using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.ExportItemList.Config
{
    public class ContextMenuExt : ContextMenuExtension
    {
        public ContextMenuExt()
        {
            AssignId = @"ExportItemList";
            //Command = @"ExportItemList";

            Name = Resources.ToolbarButtonName;
            //Title = Resources.ToolbarButtonTooltip;


            PageId = Constants.PageIds.HomePage;
            GroupId = Constants.GroupIds.HomePage.ManageGroup;// @"AccessManagementGroup";
            InsertBefore = @"WhereUsedBtn"; //Constants.RibbonToolbarButtonIds.HomePage.ManageGroup.WhereUsed;

            Dependencies.Add<ButtonGroup>();
            Apply.ToView(Constants.Views.DashboardView, "DashboardToolbar");

        }
    }
}
