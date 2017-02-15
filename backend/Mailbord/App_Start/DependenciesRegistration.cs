using Mailbord.Work.Works;
using Microsoft.Practices.Unity;
using Steadyworks.Work.Base;
using Steadyworks.Work.WorkInterfaces;

namespace Mailbord
{
    public class Connection : IConnection
    {
        public string ConnectionString => "mongodb://steadywork.pro:27017/galleon_db";
    }

    public static class DependenciesRegistration
    {
        public static void Register(UnityContainer container)
        {   
            container.RegisterType<IMailer, Mailer>(new InjectionConstructor(new Connection()));
        }
    }
}