using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Steadyworks.Repository.Base
{
    public interface IRepository<TEntity> where TEntity: IEntity
    {
        string Upsert(TEntity entity);
        
        void UpsertMany(IEnumerable<TEntity> entities);

        void Delete(string key);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetByQuery(Expression<Func<TEntity, bool>> expression);

        IEntity GetById(string id);
    }
}
