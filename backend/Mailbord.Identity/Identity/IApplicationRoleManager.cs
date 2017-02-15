using Mailbord.Core;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Identity.Identity
{
    public interface IApplicationRoleManager
    {
        void Dispose();
        Task<IdentityResult> CreateAsync(IdentityRole role);
        Task<IdentityResult> UpdateAsync(IdentityRole role);
        Task<IdentityResult> DeleteAsync(IdentityRole role);
        Task<bool> RoleExistsAsync(string roleName);
        Task<IdentityRole> FindByIdAsync(string roleId);
        Task<IdentityRole> FindByNameAsync(string roleName);
        IIdentityValidator<IdentityRole> RoleValidator { get; set; }
        IQueryable<IdentityRole> Roles { get; }
    }
}
