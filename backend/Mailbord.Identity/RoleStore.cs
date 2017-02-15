using Mailbord.Core;
using Mailbord.Core.Utils;
using Microsoft.AspNet.Identity;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Identity
{
    public class RoleStore<TRole> : IRoleStore<TRole>, IQueryableRoleStore<TRole>
        where TRole : IdentityRole
    {
        private readonly IMongoCollection<TRole> _roles;
        private const string CollectionName = "IdentityRole";

        public RoleStore(string connectionNameOrUrl)
        {
            var db = MongoUtil<TRole>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
            _roles = db.GetCollection<TRole>(CollectionName);
        }

        public RoleStore(IMongoCollection<TRole> roles)
        {
            _roles = roles;
        }

        public virtual Task CreateAsync(TRole role)
        {
            return _roles.InsertOneAsync(role);
        }

        public virtual Task UpdateAsync(TRole role)
        {
            return _roles.ReplaceOneAsync(r => r.Id == role.Id, role);
        }

        public virtual Task DeleteAsync(TRole role)
        {
            return _roles.DeleteOneAsync(r => r.Id == role.Id);
        }

        public virtual Task<TRole> FindByIdAsync(string roleId)
        {
            return _roles.Find(r => r.Id == roleId).FirstOrDefaultAsync();
        }

        public virtual Task<TRole> FindByNameAsync(string roleName)
        {
            return _roles.Find(r => r.Name == roleName).FirstOrDefaultAsync();
        }

        public virtual IQueryable<TRole> Roles => _roles.AsQueryable();

        public virtual void Dispose()
        {
            // no need to dispose of anything, mongodb handles connection pooling automatically
        }
    }
}
