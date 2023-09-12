using CharlesStanley.Onboarding.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Service
{
    public interface ICMDataAdapter
    {
        Task<bool> CreateCollection(string dbName, string name);
        Task<bool> CreateDocument(string dbName, string name, CsOnboardingForm form);

    }

}
