using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mailbord.Core;
using Mailbord.Core.Utils;
using MongoDB.Driver;

namespace Mailbord.Identity.Galleon
{
    public class GalleonUserStore
    {
        private readonly IMongoCollection<GalleonRegistrationModel> _galleonUsers;
        private const string CollectionName = "users";

        public GalleonUserStore(string connectionNameOrUrl)
        {
            var db = MongoUtil<IdentityUser>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
            _galleonUsers = db.GetCollection<GalleonRegistrationModel>(CollectionName);
        }

         public virtual Task CreateAsync(GalleonRegistrationModel user)
        {
            return _galleonUsers.InsertOneAsync(user);
        }
    }
}