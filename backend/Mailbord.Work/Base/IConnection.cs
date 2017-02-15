using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Steadyworks.Work.Base
{
    public interface IConnection
    {
        string ConnectionString { get; }
    }
}
