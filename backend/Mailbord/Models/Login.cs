using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mailbord.Models
{
    public class Login
    {
        public string grant_type { get; set; }
        public string userName {get;set;}
        public string password { get; set; }
    }
}