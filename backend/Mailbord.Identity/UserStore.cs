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
    public class UserStore<TUser> :
       IUserStore<TUser>,
       IUserRoleStore<TUser>,
       IUserPasswordStore<TUser>,
       IUserSecurityStampStore<TUser>
       where TUser : IdentityUser
    {
        private readonly IMongoCollection<TUser> _users;
        private const string CollectionName = "identity";

        public UserStore(string connectionNameOrUrl)
        {
            var db = MongoUtil<TUser>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
            _users = db.GetCollection<TUser>(CollectionName);
        }

        public virtual Task CreateAsync(TUser user)
        {
            return _users.InsertOneAsync(user);
        }

        public virtual Task UpdateAsync(TUser user)
        {
            return _users.ReplaceOneAsync(u => u.Id == user.Id, user);
        }

        public virtual Task DeleteAsync(TUser user)
        {
            return _users.DeleteOneAsync(u => u.Id == user.Id);
        }

        public virtual Task<TUser> FindByIdAsync(string userId)
        {
            return _users.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public virtual Task<TUser> FindByNameAsync(string userName)
        {
            return _users.Find(u => u.UserName == userName).FirstOrDefaultAsync();
        }

        public virtual Task AddToRoleAsync(TUser user, string roleName)
        {
            user.AddRole(roleName);
            return Task.FromResult(0);
        }

        public virtual Task RemoveFromRoleAsync(TUser user, string roleName)
        {
            user.RemoveRole(roleName);
            return Task.FromResult(0);
        }

        public virtual Task<IList<string>> GetRolesAsync(TUser user)
        {
            return Task.FromResult((IList<string>)user.Roles);
        }

        public virtual Task<bool> IsInRoleAsync(TUser user, string roleName)
        {
            return Task.FromResult(user.Roles.Contains(roleName));
        }

        public virtual Task SetPasswordHashAsync(TUser user, string passwordHash)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public virtual Task<string> GetPasswordHashAsync(TUser user)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public virtual Task<bool> HasPasswordAsync(TUser user)
        {
            return Task.FromResult(user.HasPassword());
        }

        public virtual Task SetSecurityStampAsync(TUser user, string stamp)
        {
            user.SecurityStamp = stamp;
            return Task.FromResult(0);
        }

        public virtual Task<string> GetSecurityStampAsync(TUser user)
        {
            return Task.FromResult(user.SecurityStamp);
        }

        public virtual void Dispose()
        {
            // no need to dispose of anything, mongodb handles connection pooling automatically
        }
    }
}
