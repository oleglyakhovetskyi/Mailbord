using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Mailbord.Repository.Repository;
using MongoDB.Bson;
using MongoDB.Driver;
using Steadyworks.Repository.Base;

namespace Steadyworks.Repository.Repository
{
    public class Repository<T> : IRepository<T> where T : IEntity
    {
        private readonly Driver _driver;

        public Repository(Driver driver)
        {
            _driver = driver;
        }

        private IMongoCollection<T> GetCollection()
        {
            Type entityType = typeof(T);
            return _driver.Database.GetCollection<T>(entityType.Name.ToLower());
        }

        public string Upsert(T entity)
        {
            var result = GetCollection().ReplaceOne(e => e.Id.Equals(entity.Id), entity, new UpdateOptions
            {
                IsUpsert = true
            });

            return result.UpsertedId.AsString;
        }

        public void UpsertMany(IEnumerable<T> entities)
        {
            entities.ToList().ForEach(entity => Upsert(entity));
        }

        public void Delete(string key)
        {
            GetCollection().DeleteOne(e => e.Id.Equals(key));
        }

        public IEnumerable<T> GetAll()
        {
            return GetCollection().Find(new BsonDocument()).ToList();
        }

        public IEnumerable<T> GetByQuery(Expression<Func<T, bool>> expression)
        {
            return GetCollection().Find(expression).ToList();
        }

        public IEntity GetById(string id)
        {
            return GetCollection().Find(e => e.Id.Equals(id)).First();
        }
    }
}
