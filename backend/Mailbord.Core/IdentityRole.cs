using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Core
{
    public class IdentityRole : IRole<string>
    {
        public IdentityRole()
        {
            Id = Guid.NewGuid().ToString("D");
        }

        public IdentityRole(string roleName) : this()
        {
            Name = roleName;
        }

        public string Id { get; }

        public string Name { get; set; }
    }
}
