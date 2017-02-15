using MongoDB.Driver;
using Steadyworks.Repository.Repository;

namespace Mailbord.Repository.Repository
{
    public class Driver
    {
        private readonly DriverConnection _driverConnection;
        private readonly MongoClient _client;

        public Driver(string connectionString)
        {
            _driverConnection = new DriverConnection(connectionString);
            _client = new MongoClient(_driverConnection.Url);
        }

        public IMongoDatabase Database => _client.GetDatabase(_driverConnection.Url.DatabaseName);
    }
}
