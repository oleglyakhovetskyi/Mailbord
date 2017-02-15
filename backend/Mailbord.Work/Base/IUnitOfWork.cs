using Steadyworks.Repository.Base;

namespace Steadyworks.Work.Base
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : IEntity;
    }
}
