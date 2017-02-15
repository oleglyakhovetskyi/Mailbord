using System.Web.Http;
using Mailbord;
using Mailbord.DI;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Practices.Unity;
using Owin;
using Steadyworks;
using Microsoft.Owin.Security.OAuth;
using Mailbord.Provider;
using System;

[assembly: OwinStartup(typeof(Startup))]

namespace Mailbord
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Configure Web API for self-host. 
            var config = new HttpConfiguration();

            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();

            WebApiConfig.Register(config);

            OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider()
            };
            app.UseOAuthAuthorizationServer(options);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            app.UseWebApi(config);
            
           
        }
    }
}
