using Mailbord.Core;
using Mailbord.Core.Utils;
using Mailbord.Data.RepoModels;
using Mailbord.Identity;
using Mailbord.Identity.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Provider
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (var repo = new ApplicationUserManager(new UserStore<IdentityUser>(MongoUtil<IdentityUser>.GetDefaultConnectionString())))
            {
                var user = await repo.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                foreach (var role in user.Roles)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, role));
                }
                identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
              
                context.Validated(identity);
            }
        }

        public static AuthenticationProperties CreateProperties(IdentityUser user)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", user.UserName }
            };
            return new AuthenticationProperties(data);
        }
    }
}
