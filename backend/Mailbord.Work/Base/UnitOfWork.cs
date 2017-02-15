using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mailbord.Repository.Repository;
using Steadyworks.Repository.Base;
using Steadyworks.Repository.Repository;

namespace Steadyworks.Work.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly Driver Driver;
        
        public UnitOfWork(IConnection connection)
        {
            Driver = new Driver(connection.ConnectionString);
        }

        public IRepository<T> GetRepository<T>() where T : IEntity
        {
            return new Repository<T>(Driver);
        }
    }
}
