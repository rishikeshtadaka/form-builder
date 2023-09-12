using CharlesStanley.Onboarding.Repository;
using CharlesStanley.Onboarding.Domain;
using CharlesStanley.Onboarding.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CharlesStanley.Onboarding.Model;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Documents;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace CharlesStanley.Onboarding.Service.FormService
{
    public class FormService : Service<CsOnboardingForm>, IFormService
    {
        private IMapper _mapper;
        private IRepository<CsOnboardingForm> _repository;
        private CsOnboardContext _context;
        public FormService(IRepository<CsOnboardingForm> repository, IMapper mapper,CsOnboardContext context) : base(repository)
        {
            _mapper=mapper;
            _repository = repository;
            _context = context;
        }


        public async Task<bool> Add(FormModelReq formModel,string collectionId)
        {
            CsOnboardingForm form = new CsOnboardingForm();
            form.Id = Guid.NewGuid().ToString();
            formModel.Id=form.Id;
            formModel.ContainerId=collectionId;
            formModel.CreatedAt = DateTime.UtcNow;
            var model=_mapper.Map<CsOnboardingForm>(formModel);
            Insert(model);
          return await this.SaveChange();   
        }

        public async Task<CsOnboardingForm> GetById(string formid,string collectionId)
        {
            var result = _context.formbuilder.FirstOrDefault(x=>x.Id==formid && x.ContainerId==collectionId);
            if (result!=null)
            {
                return result;
            }
            return null;
        }


        public async Task Delete(string id,string collectionId)
        {
            var formDeletion = _context.formbuilder.FirstOrDefault(x=>x.Id==id && x.ContainerId==collectionId);
            this.Delete(formDeletion);
            this.SaveChange();
        }

        public async Task<List<FormModelReq>> GetAll(string collectionId)
        {
            List<FormModelReq> csforms = new List<FormModelReq>();
            var formList = _context.formbuilder.Where(x => x.ContainerId==collectionId);
            var result =  formList.Select(x=> new {x.Id,x.Name,x.ContainerId,x.CreatedAt}).ToList();
            foreach (var form in result)
            {
                FormModelReq csOnboardingForm = new FormModelReq();
                csOnboardingForm.ContainerId=form.ContainerId;
                csOnboardingForm.Id= form.Id;
                csOnboardingForm.Name=form.Name;
                csOnboardingForm.CreatedAt=form.CreatedAt;
                csforms.Add(csOnboardingForm);
            }
            return csforms;
        }

        public async Task Update(string id,string collectionId,FormModelReq requpdate)
        {
            if(requpdate == null)
            {
                throw new Exception("form updation detail not supplied");
            }
            else
            {
                CsOnboardingForm csOnboardingForm= new CsOnboardingForm();
                ElementsReq elementsReq = new ElementsReq();
                csOnboardingForm.Id=requpdate.Id;
                csOnboardingForm.ContainerId=collectionId;
                csOnboardingForm.Name=requpdate.Name;
               //csOnboardingForm.Elements=(ElementsReq)requpdate.Elements;
                csOnboardingForm.CreatedAt= requpdate.CreatedAt;

                _context.formbuilder.Update(csOnboardingForm);
                this.SaveChange();
            }
            
        }

       
    }
}
