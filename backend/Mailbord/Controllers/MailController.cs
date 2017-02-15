using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Mailbord.Core;
using Mailbord.Core.Utils;
using Mailbord.Identity;
using Mailbord.Identity.Identity;
using Mailbord.Repository;
using Mailbord.Repository.Mail;
using Mailbord.SignalRConfig;
using Microsoft.AspNet.SignalR;

namespace Mailbord.Controllers
{
    [Authorize]
    [RoutePrefix("api/mail")]
    public class MailController : ApiController
    {
        private readonly CheckStore<CheckModel> _check;
        private readonly MailStore<Mail> _mail;
        private readonly IApplicationUserManager _userManager;

        public MailController()
        {
            _mail = new MailStore<Mail>(MongoUtil<Mail>.GetDefaultConnectionString());
            _userManager =
                new ApplicationUserManager(
                    new UserStore<IdentityUser>(MongoUtil<IdentityUser>.GetDefaultConnectionString()));
            _check = new CheckStore<CheckModel>(MongoUtil<Mail>.GetDefaultConnectionString());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getnew")]
        public async Task<IHttpActionResult> GetNew()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<MailHub>();
            var currentUser = User.Identity.Name;
            if (currentUser == null)
                return BadRequest();
            List<Mail> newMessages;

            var timeOfRequest = DateTime.Now;

            var lastUpdate = _check.FindLastCheck(currentUser).Result;
            if (lastUpdate == null)
            {
                var check = new CheckModel {UserName = currentUser, DateOfLastCheck = timeOfRequest};
                await _check.CreateAsync(check);
                newMessages = _mail.FindNewEmail(currentUser, timeOfRequest);
            }
            else
            {
                newMessages = _mail.FindNewEmail(currentUser, lastUpdate.DateOfLastCheck);
                lastUpdate.DateOfLastCheck = timeOfRequest;
                await _check.UpdateAsync(lastUpdate);
            }

            hubContext.Clients.Group(currentUser).onMessage(newMessages);

            return Ok();
        }

        [HttpGet]
        [Route("getall")]
        public async Task<IHttpActionResult> GetAllMessage()
        {
            var myUri = new Uri(Request.RequestUri.ToString());
            var param = HttpUtility.ParseQueryString(myUri.Query).Get("parameter");

            var currentUser = User.Identity.Name;

            var userinfo = await _userManager.FindByNameAsync(currentUser);
            var list = new List<Mail>();
            switch (param)
            {
                case "inbox":
                    list = await _mail.FindByInboxEmailAsync(userinfo.UserName);
                    break;
                case "sent":
                    list = await _mail.FindBySentEmailAsync(userinfo.UserName);
                    break;
                case "trash":
                    list = await _mail.FindByTrashEmailAsync(userinfo.UserName);
                    break;
                case "spam":
                    list = await _mail.FindBySpamEmailAsync(userinfo.UserName);
                    break;
                case "drafts":
                    list = await _mail.FindByDraftEmailAsync(userinfo.UserName);
                    break;
                case "important":
                    list = await _mail.FindByImportantEmailAsync(userinfo.UserName);
                    break;
            }
            return Ok(list);
        }

        [HttpPut]
        [Route("trash")]
        public async Task<IHttpActionResult> Trash(Mail message)
        {
            var eIdMessage = await _mail.FindByeIdAsync(message.EId);
            eIdMessage.Trash = true;
            await _mail.UpdateAsync(eIdMessage);
            return Ok();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IHttpActionResult> Delete()
        {
            var myUri = new Uri(Request.RequestUri.ToString());
            var eId = HttpUtility.ParseQueryString(myUri.Query).Get("parameter");
            var eIdMessage = await _mail.FindByeIdAsync(eId);
            await _mail.DeleteAsync(eIdMessage);
            return Ok();
        }

        [HttpPut]
        [Route("draft")]
        public async Task<IHttpActionResult> Draft(Mail message)
        {
            var currentUser = User.Identity.Name;
            var userinfo = await _userManager.FindByNameAsync(currentUser);

            var sendMessage = new Mail
            {
                Subject = message.Subject,
                Sender = userinfo.UserName,
                Receiver = message.Receiver,
                Message = message.Message,
                State = "draft"
                // CreatedAt = DateTime.Now.ToString("G"),
            };

            await _mail.CreateAsync(sendMessage);

            return Ok();
        }

        [HttpPut]
        [Route("read")]
        public async Task<IHttpActionResult> Read(Mail message)
        {
            var eIdMessage = await _mail.FindByeIdAsync(message.EId);
            eIdMessage.Read = true;
            await _mail.UpdateAsync(eIdMessage);
            return Ok();
        }

        [HttpPut]
        [Route("important")]
        public async Task<IHttpActionResult> Important(Mail message)
        {
            var eIdMessage = await _mail.FindByeIdAsync(message.EId);

            if (eIdMessage.State != "important")
                eIdMessage.State = "important";
            else eIdMessage.State = null;

            await _mail.UpdateAsync(eIdMessage);
            return Ok();
        }
    }
}