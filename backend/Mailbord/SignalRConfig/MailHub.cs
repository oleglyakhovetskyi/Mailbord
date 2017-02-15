using Mailbord.Repository.Mail;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Routing;
using Mailbord.Core;
using Mailbord.Data.RepoModels;
using Mailbord.Identity.Identity;
using Microsoft.AspNet.SignalR.Client;
using MongoDB.Bson;

namespace Mailbord.SignalRConfig
{
    [Authorize]
    [HubName("MailHub")]
    public class MailHub : Hub
    {
        public static void SendMessage(String message) // dynamic
        {
        
          //  context.Clients.All.onMessage(message);
           // SendChatMessage("dad","sad")
           }

        public void SendChatMessage(string userName)
        {
            Clients.Group(userName).onMessage("HELLO BRO");
        }

        public void Join(string userName)
        {
            Groups.Add(Context.ConnectionId, userName); ;
        }

        public void Check()
        {
            System.Timers.Timer t = new System.Timers.Timer(TimeSpan.FromMinutes(1).Milliseconds);
            // set the time (1 min in this case)
            t.AutoReset = true;
           // t.Elapsed += new System.Timers.ElapsedEventHandler(SendChatMessage());
            t.Start();
        }


        /*  public override Task OnConnected()
           {
              // var currentUser = User.Identity.Name;
              // string name = Context.User.Identity.Name;

              Groups.Add(Context.ConnectionId, "lex");

               return base.OnConnected();
           }
           */
    }
}