using Mailbord.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Mailbord.Repository.Mail
{
    public class MailStore<TMail> where TMail:Mail
    {
        private readonly IMongoCollection<TMail> _mail;
        private const string CollectionName = "mail";

        public MailStore(string connectionNameOrUrl)
        {
            var db = MongoUtil<TMail>.GetDatabaseFromUrl(new MongoUrl(connectionNameOrUrl));
            _mail = db.GetCollection<TMail>(CollectionName);
        }

        public virtual List<TMail> FindNewEmail(string mailName, DateTime lastCheck)
        {
            return _mail.Find(u => u.Association.Contains(mailName) && u.Sent != true && u.Trash != true && (u.CreatedAt >= lastCheck)).SortByDescending(u => u.UpdatedAt).ToList();
        }

        public virtual List<TMail> FindByInboxEmail(string mailName)
        {
            return _mail.Find(u => u.Association.Contains(mailName) && u.Sent != true && u.Trash != true).SortByDescending(u => u.UpdatedAt).ToList();
        }

        public virtual Task CreateAsync(TMail mail)
         {
             return _mail.InsertOneAsync(mail);
         }

          public virtual Task UpdateAsync(TMail mail)
          {
              return _mail.ReplaceOneAsync(u => u.Id == mail.Id, mail);
          }

          public virtual Task DeleteAsync(TMail mail)
          {
              return _mail.DeleteOneAsync(u => u.Id == mail.Id);
          }

         public virtual Task<TMail> FindByIdAsync(ObjectId mailId)
          {
              return _mail.Find(u => u.Id == mailId).FirstOrDefaultAsync();
         }

        public virtual Task<TMail> FindByeIdAsync(string maileId)
        {
            return _mail.Find(u => u.EId == maileId).FirstOrDefaultAsync();
        }

        public virtual Task<List<TMail>> FindByInboxEmailAsync(string mailName)
          {
              return _mail.Find(u => u.Association.Contains(mailName) && u.Sent != true && u.Trash != true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual Task<List<TMail>> FindBySentEmailAsync(string mailName)
        {
           return _mail.Find(u => u.Sender.Contains(mailName) && u.Sent==true && u.Trash!=true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual Task<List<TMail>> FindByTrashEmailAsync(string mailName)
        {
            return _mail.Find(u => u.Association == mailName && u.Trash == true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual Task<List<TMail>> FindBySpamEmailAsync(string mailName)
        {
            return _mail.Find(u => u.Receiver.Contains(mailName) && u.Spam == true && u.Trash != true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual Task<List<TMail>> FindByDraftEmailAsync(string mailName)
        {
            return _mail.Find(u => u.Association.Contains(mailName) && u.State == "draft" && u.Trash != true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual Task<List<TMail>> FindByImportantEmailAsync(string mailName)
        {
            return _mail.Find(u => u.Association.Contains(mailName) && u.State == "important" && u.Trash != true).SortByDescending(u => u.UpdatedAt).ToListAsync();
        }

        public virtual void Dispose()
          {
              // no need to dispose of anything, mongodb handles connection pooling automatically
          }
          
    }
}
