using Alchemy.Plugins.ExportItemList;
using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy4Tridion.Plugins.ExportItemList.Config
{
    /// <summary>
    /// This class represnts the RibbonToolbarExtension
    /// It will add a Button "Export Item List" on Dashboard view under the HomePage tab
    /// </summary>
    public class ToolbarButton : RibbonToolbarExtension
    {
        public ToolbarButton()
        {
            // HTML Id of the button
            AssignId = @"ExportItemList";

            // Name of the Javascript Command to be fired on the button click
            Command = @"ExportItemList";

            // Label for the button
            Name = Resources.ToolbarButtonName;

            // Tool tip for the button
            Title = Resources.ToolbarButtonTooltip;

            // Ribbon toolbar tab for the button
            PageId = Constants.PageIds.HomePage;

            // The group inside homepage tab, where we want to show the button
            GroupId = Constants.GroupIds.HomePage.ManageGroup;

            // Insert the button before "Where Used Button"
            InsertBefore = @"WhereUsedBtn";

            // Add "ButtonGroup" resource group as a dependancy of the extension
            Dependencies.Add<ButtonGroup>();

            // Apply the extension to Dashboard view
            Apply.ToView(Constants.Views.DashboardView, "DashboardToolbar");

        }
    }
}
