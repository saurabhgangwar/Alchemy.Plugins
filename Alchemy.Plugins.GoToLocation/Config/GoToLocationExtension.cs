using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy.Plugins.GoToLocation.Config
{
    class GoToLocationExtension: RibbonToolbarExtension
    {
        public GoToLocationExtension()
        {
           
            // The unique identifier used for the html element created.
            AssignId = "RibbonToolbarGoToLocationButton";

            // The name of the command to execute when clicked
            Command = "GoToLocationCommand";

            // The label of the button.
            Name = "Go To Location";

            // The page tab to assign this extension to. See Constants.PageIds.
            PageId = Constants.PageIds.HomePage;
            
            // Option GroupId, put this into an existing group
            GroupId = Constants.GroupIds.HomePage.ManageGroup;
            //GroupId = "GoToLocationGroup";
 
            // The tooltip label that will get applied.
            Title = "Go To Location";

            // Add a dependency to the resource group that contains the files/commands that this toolbar extension will use.
            Dependencies.Add<GoToLocationResouceGroup>();

            // apply the extension to a specific view.
           Apply.ToView(Constants.Views.ComponentView);
           Apply.ToView(Constants.Views.PageView);
           
        }
    }
}
