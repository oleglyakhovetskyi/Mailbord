using System;
using Mailbord.Data.InputModels.Customer;
using Mailbord.Data.RepoModels;
using Steadyworks.Work.Base;
using Steadyworks.Work.WorkInterfaces;
using Mailbord.Core;

namespace Mailbord.Work.Works
{
    public class Customer : UnitOfWork, ICustomer
    {
        public Customer(IConnection connection) : base(connection)
        {

        }

        public void AddQuote(Quote quote)
        {
            var profile = new IdentityUser
            {
                Company = quote.Company,
                Email = quote.Email,
                Name = quote.Name
            };

            var message = new Message
            {
                MessageBody = quote.Message,
                Email = quote.Email
            };
        }

        public void Subscribe(string email)
        {
            throw new NotImplementedException();
        }
    }
}
