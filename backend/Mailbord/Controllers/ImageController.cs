using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Mailbord.Core;
using Mailbord.Core.Utils;
using Mailbord.Identity;
using Mailbord.Identity.Identity;
using Mailbord.Provider;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Mailbord.Controllers
{
    [Authorize]
    [RoutePrefix("api/image")]
    public class ImageController : ApiController
    {
        private const string Container = "mailbordpic";
        private readonly IApplicationUserManager _userManager;

        public ImageController()
        {
            _userManager =
                new ApplicationUserManager(
                    new UserStore<IdentityUser>(MongoUtil<IdentityUser>.GetDefaultConnectionString()));
        }

        [HttpPut]
        [Route("update")]
        public async Task<IHttpActionResult> UploadFile()
        {
            if (!Request.Content.IsMimeMultipartContent("form-data"))
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var accountName = ConfigurationManager.AppSettings["storage:account:name"];
            var accountKey = ConfigurationManager.AppSettings["storage:account:key"];
            var storageAccount = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
            var blobClient = storageAccount.CreateCloudBlobClient();

            var imagesContainer = blobClient.GetContainerReference(Container);
            var provider = new AzureStorageMultipartFormDataStreamProvider(imagesContainer);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error has occured. Details: {ex.Message}");
            }

            // Retrieve the filename of the file you have uploaded
            var filename = provider.FileData.FirstOrDefault()?.LocalFileName;
            if (string.IsNullOrEmpty(filename))
                return BadRequest("An error has occured while uploading your file. Please try again.");

            var currentUser = User.Identity.Name;

            var userinfo = await _userManager.FindByNameAsync(currentUser);
            if (userinfo.Image != null && !userinfo.Image.Contains("default"))
            {
                CloudBlockBlob blockBlob = imagesContainer.GetBlockBlobReference(userinfo.Image.Remove(0,54));
                blockBlob.Delete();
            }

            var identityUser = new IdentityUser
            {
                Id = userinfo.Id,
                UserName = userinfo.UserName,
                Email = userinfo.Email,
                Name = userinfo.Name,
                Company = userinfo.Company,
                PasswordHash = userinfo.PasswordHash,
                SecurityStamp = userinfo.SecurityStamp,
                Roles = userinfo.Roles,
                Image = storageAccount.BlobEndpoint + Container + "/" + filename,
            };
            var result = await _userManager.UpdateAsync(identityUser);

            return Ok(identityUser);
        }
    }
}