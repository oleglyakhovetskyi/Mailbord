using System.Web.Http;
using Mailbord.Data.InputModels.Customer;
using Steadyworks.Work.WorkInterfaces;

namespace Mailbord.Controllers
{
    [RoutePrefix("api/customers")]
    public class CustomerController : ApiController
    {
        private readonly ICustomer _customer;

        public CustomerController(ICustomer customer)
        {
            _customer = customer;
        }

        [HttpPost]
        [Route("quote")]
        public void AddQuote([FromBody]Quote quote)
        {
            _customer.AddQuote(quote);
        }
    }
}
