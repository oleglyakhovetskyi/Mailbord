using System.Collections.Generic;
using Mailbord.Repository.Mail;
using Steadyworks.Repository.Repository;
using Steadyworks.Work.Base;
using Steadyworks.Work.WorkInterfaces;

namespace Mailbord.Work.Works
{
    public class Mailer : UnitOfWork, IMailer
    {
        public Mailer(IConnection connection) : base(connection)
        {
        }

        public IEnumerable<Mail> GetMessages()
        {
            var repository = new Repository<Mail>(Driver);

            return repository.GetAll();
        }

    }
}
