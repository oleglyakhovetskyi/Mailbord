using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mailbord.Repository.Mail;
using Steadyworks.Work.Base;

namespace Steadyworks.Work.WorkInterfaces
{
    public interface IMailer : IUnitOfWork
    {
        IEnumerable<Mail> GetMessages();
    }
}
