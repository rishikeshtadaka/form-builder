using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Service
{
    public interface ICMConnection
    {
        Task<DocumentClient> InitalizeAsync(string collectionId);
    }
}
