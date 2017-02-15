using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Mailbord.Core;
using Mailbord.Core.Utils;
using MongoDB.Driver;

namespace Mailbord.Galleon
{
    public class GalleonUserStore
    {
        private readonly IMongoCollection<GalleonRegistrationModel> _users;
        private const string CollectionName = "identity";

        public GalleonUserStore(string connectionNameOrUrl)
        {
            var db = MongoUtil<IdentityUser>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
            _users = db.GetCollection<GalleonRegistrationModel>(CollectionName);
        }

        public virtual Task CreateAsync(GalleonRegistrationModel user)
        {
            return _users.InsertOneAsync(user);
        }
    }
}