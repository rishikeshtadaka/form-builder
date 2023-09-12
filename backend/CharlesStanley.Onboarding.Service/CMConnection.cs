using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Net;

namespace CharlesStanley.Onboarding.Service
{
    public class CMConnection : ICMConnection
    {
        protected string DatabaseId { get; }
        protected string CollectionId { get; set; }
        private DocumentClient _client;
        private readonly string _endpointUrl;
        private readonly string _authKey;
        private readonly Random _random = new Random();
        private const string _partitionKey = "test";
        private readonly ILogger<ICMConnection> _logger;
        public CMConnection(IConfiguration configuration, ILogger<ICMConnection> logger)
        {
            DatabaseId=configuration.GetValue<string>("CosmosDbSetting:DatabaseId");
            _endpointUrl=configuration.GetValue<string>("CosmosDbSetting:URI");
            _authKey=configuration.GetValue<string>("CosmosDbSetting:AuthKey");
            _logger=logger;
        }

        private async Task<bool> VerifyDatabaseCreated()
        {
            var database = await _client.CreateDatabaseIfNotExistsAsync(
                new Database
                {
                    Id = DatabaseId
                }
                );

            if (database.StatusCode == HttpStatusCode.Created)
            {
                return true;
            }
            else if (database.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }
        private async Task<bool> VerifyCollectionCreated()
        {
            if (string.IsNullOrEmpty(CollectionId))
            {
                throw new Exception("No collection id was set before accessing the CosmosConnection's Initialize method");
            }

            var databaseUri = UriFactory.CreateDatabaseUri(DatabaseId);
            var collection = await _client.CreateDocumentCollectionIfNotExistsAsync(
                databaseUri, new DocumentCollection
                {
                    Id = CollectionId,
                    PartitionKey = new PartitionKeyDefinition
                    {
                        Paths = new Collection<string> { $"/{_partitionKey}" }
                    }
                });

            if (collection.StatusCode == HttpStatusCode.Created)
            {
                return true;
            }
            else if (collection.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }

            return false;

        }

        public async Task<DocumentClient> InitalizeAsync(string collectionId)
        {
            CollectionId = collectionId;

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var connectionPolicy = new ConnectionPolicy
            {
                ConnectionMode = ConnectionMode.Gateway,
                ConnectionProtocol = Protocol.Https
            };

            if (_client == null)
                _client = new DocumentClient(
                    new Uri(_endpointUrl), _authKey, connectionPolicy);

            await VerifyDatabaseCreated();
            await VerifyCollectionCreated();
            return _client;
        }
    }
}
