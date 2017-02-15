using Mailbord.Core;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Identity.Identity
{
    public class ApplicationRoleManager : RoleManager<IdentityRole>, IApplicationRoleManager
    {
        public ApplicationRoleManager(IRoleStore<IdentityRole, string> store)
            : base(store)
        {
        }
    }
}
