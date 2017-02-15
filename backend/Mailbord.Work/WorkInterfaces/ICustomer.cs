using Mailbord.Data.InputModels.Customer;
using Steadyworks.Work.Base;

namespace Steadyworks.Work.WorkInterfaces
{
    public interface ICustomer : IUnitOfWork
    {
        void AddQuote(Quote quote);
        void Subscribe(string email);
    }
}
