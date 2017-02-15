using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mailbord.Core.Utils;
using MongoDB.Driver;

namespace Mailbord.Repository.Mail
{
    public class CheckStore<TCheckModel> where TCheckModel : CheckModel
    {
            private readonly IMongoCollection<TCheckModel> _check;
            private const string CollectionName = "check";

            public CheckStore(string connectionNameOrUrl)
            {
                var db = MongoUtil<CheckModel>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
                _check = db.GetCollection<TCheckModel>(CollectionName);
            }

              public virtual Task CreateAsync(TCheckModel timeOfCheck)
             {
            return _check.InsertOneAsync(timeOfCheck);
             }

        public virtual Task<TCheckModel> FindLastCheck(string UserName)
        {
            return _check.Find(u => u.UserName==UserName).FirstOrDefaultAsync();
        }

        public virtual Task UpdateAsync(TCheckModel updateTime)
        {
            return _check.ReplaceOneAsync(u => u.Id == updateTime.Id, updateTime);
        }
        /*   public virtual List<TMail> FindNewEmail(string mailName, DateTime lastCheck)
               {
                   return _check.Find(u => u.Association.Contains(mailName) && u.Sent != true && u.Trash != true && (u.CreatedAt > lastCheck)).SortByDescending(u => u.UpdatedAt).ToList();
               }
               */
    }
}
