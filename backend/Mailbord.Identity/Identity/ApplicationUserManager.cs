using Mailbord.Core;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Identity.Identity
{
    public class ApplicationUserManager : UserManager<IdentityUser>, IApplicationUserManager
    {
        public ApplicationUserManager(IUserStore<IdentityUser> store)
            : base(store)
        {

        }
    }
}
