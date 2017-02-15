using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Mailbord.Repository
{
    public class CheckModel
    {
        public Object Id { get; set; }

        public CheckModel()
        {
            Id = ObjectId.GenerateNewId();
        }

        public DateTime DateOfLastCheck { get; set; }

        public string UserName { get; set; }
    }
}
