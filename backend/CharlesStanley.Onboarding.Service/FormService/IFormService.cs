using CharlesStanley.Onboarding.Domain;
using CharlesStanley.Onboarding.Model;
using CharlesStanley.Onboarding.Service.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Service.FormService
{
    public interface IFormService:IService<CsOnboardingForm>
    {
        
        Task Delete(string id, string collectionId);
        Task<CsOnboardingForm> GetById(string id, string collectionId);
        Task<List<FormModelReq>> GetAll(string collectionId);
        Task Update(string Id,string collectionId,FormModelReq formModel);
        Task<bool> Add(FormModelReq formModel,string collectionId);

    }
}
