using Alchemy4Tridion.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Linq;
using Tridion.ContentManager.CoreService.Client;

namespace Alchemy.Plugins.LocalizeCommenter.Controllers
{
    public class LocalizeCommentsModel
    {
        public string[] itemIds { get; set; }
        public string comments { get; set; }
        public string appDataKey { get; set; }
    }

    public class LocalizeCommentResponse
    {
        public string comments { get; set; }
        public string user { get; set; }
        public string lastCommentDate { get; set; }
    }

    [AlchemyRoutePrefix("LocalizeCommenter")]
    public class LocalizeCommenterController : AlchemyApiController
    {
        [HttpPost]
        [Route("LocalizeComment")] // needs to be changed
        public bool LocalizeComment(LocalizeCommentsModel model)
        {
            SessionAwareCoreServiceClient client = null;
            try
            {
                client = GetClient();
                foreach (var itemId in model.itemIds)
                {

                    try
                    {
                        Localize(client, itemId);

                        var dict = new Dictionary<string, string>();
                        dict.Add(model.appDataKey + "Comments", model.comments);
                        dict.Add(model.appDataKey + "User", Tridion.Web.UI.Core.Utils.GetUserName());
                        dict.Add(model.appDataKey + "Date", DateTime.Now.ToString());
                        SetAppData(client, itemId, dict);
                    }
                    catch (Exception ex)
                    {
                        throw new ApplicationException("Unable to save localization comments for the item[" + itemId + "]", ex);
                    }

                }
            }
            catch (Exception ex)
            {

                throw new ApplicationException("Error in localize comment process", ex);
            }
            finally
            {
                if (client != null)
                {
                    client.Close();
                }
            }

            return true;

        }

        [HttpPost]
        [Route("GetLocalizeComments")]
        public LocalizeCommentResponse GetLocalizeComments(LocalizeCommentsModel model)
        {
            var client = GetClient();
            var response = new LocalizeCommentResponse();
            try
            {

                response.comments = GetAppData(client, model.itemIds[0], model.appDataKey + "Comments");
                response.lastCommentDate = GetAppData(client, model.itemIds[0], model.appDataKey + "Date");
                response.user = GetAppData(client, model.itemIds[0], model.appDataKey + "User");

            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to get localization comments for the item[" + model.itemIds[0] + "]", ex);
            }
            finally
            {
                client.Close();
            }

            return response;
        }

        [HttpGet]
        [Route("GetUserName")]
        public string DoGetUserName()
        {
            return string.Format("windowUser**{0}**|TridionUser**{1}**", System.Web.HttpContext.Current.User.Identity.Name, Tridion.Web.UI.Core.Utils.GetUserName());
            //User

        }


        [HttpGet]
        [Route("GetApiVersion")]
        public string GetApiVersion()
        {
            var client = GetClient();
            var apiVersion = client.GetApiVersion();

            client.Close();
            return string.Format("API VERSION IS **{0}**", apiVersion);

            //User

        }

        private SessionAwareCoreServiceClient GetClient()
        {
            SessionAwareCoreServiceClient client = new SessionAwareCoreServiceClient("netTcp_2013");
            client.Impersonate(Tridion.Web.UI.Core.Utils.GetUserName());
            //var userCredential = new NetworkCredential("SDL", "SDLPE");
            // client.ClientCredentials.Windows.ClientCredential = userCredential;
            return client;
        }


        private void Localize(SessionAwareCoreServiceClient tridionClient, string objectID)
        {
            /* this is just the basic code */


            RepositoryLocalObjectData item = (RepositoryLocalObjectData)tridionClient.Read(objectID, new ReadOptions());
            // if object is localized already, return
            if ((bool)item.BluePrintInfo.IsLocalized)
                return;
            tridionClient.Localize(objectID, new ReadOptions());

        }

        private string GetAppData(SessionAwareCoreServiceClient client, string itemUri, string applicationId)
        {
            var appData = client.ReadApplicationData(itemUri, applicationId);
            //bool isAscii = appData.Data.All(c => c >= 32 && c < 127);
            //var value = isAscii ? new ASCIIEncoding().GetString(appData.Data) : "<The value is not an ASCII string.>";
            //return value;
            if (appData == null)
            {
                return "N/A";
            }
            return new ASCIIEncoding().GetString(appData.Data);
        }

        private void SetAppData(SessionAwareCoreServiceClient client, string itemUri, string applicationId, string value)
        {
            var appData = new ApplicationData();
            appData.ApplicationId = applicationId;
            appData.Data = new ASCIIEncoding().GetBytes(value);
            client.SaveApplicationData(itemUri, new ApplicationData[] { appData });
        }

        private void SetAppData(SessionAwareCoreServiceClient client, string itemUri, Dictionary<string, string> keyValues)
        {
            var appDataArray = new List<ApplicationData>();
            foreach (KeyValuePair<string, string> keyValue in keyValues)
            {
                var appData = new ApplicationData();
                appData.ApplicationId = keyValue.Key;
                appData.Data = new ASCIIEncoding().GetBytes(keyValue.Value);
                appDataArray.Add(appData);
            }
            client.SaveApplicationData(itemUri, appDataArray.ToArray());
        }
    }
}
