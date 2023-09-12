using CharlesStanley.Onboarding.DataAccess;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace CharlesStanley.Onboarding.Service
{
    public class CMDataAdapter
    {
       
        public class CosmosDataAdapter : ICMDataAdapter
        {
            private readonly DocumentClient _client;
            private readonly string _accountUrl;
            private readonly string _ApiKey;

            public CosmosDataAdapter(ICMConnection connection, IConfiguration config)
            {
                _accountUrl=config.GetValue<string>("CosmosDbSetting:URI");
                _ApiKey=config.GetValue<string>("CosmosDbSetting:AuthKey");
                _client=new DocumentClient(new Uri(_accountUrl), _ApiKey);
            }

            public Task<bool> CreateDatabase(string name)
            {
                throw new NotImplementedException();
            }

            public Task<dynamic> GetData(string dbName, string name)
            {
                throw new NotImplementedException();
            }


            public async Task<bool> CreateDocument(string dbName, string name, CsOnboardingForm form)
            {
                try
                {
                    form.FormId= Guid.NewGuid().ToString();
                    await _client.UpsertDocumentAsync(UriFactory.CreateDocumentCollectionUri(dbName, name),form);
                    return true;
                }
                catch
                {
                    return false;
                }
            }

            public Task<bool> CreateCollection(string dbName, string name)
            {
                throw new NotImplementedException();
            }
        }
    }
}