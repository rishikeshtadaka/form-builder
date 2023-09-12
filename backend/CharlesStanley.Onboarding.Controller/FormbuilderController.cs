using CharlesStanley.Onboarding.Model;
using CharlesStanley.Onboarding.Service.FormService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Controller
{   
    [ApiController]
    public class FormbuilderController : CsControllerBase
    {
        private IFormService _formService;
        public FormbuilderController(IFormService formService)
        {
            this._formService = formService;
        }

        
        [HttpPost("{collectionId}/forms")]
        public async Task<IActionResult> SaveForm([FromBody] FormModelReq form,string collectionId)
        {
            if (form != null)
            {
                await _formService.Add(form,collectionId);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{collectionId}/forms")]
        public async Task<IActionResult> GetAllForms(string collectionId)
        { 
            var result = await _formService.GetAll(collectionId);
            return Ok(result);
        }
        [HttpGet("{collectionId}/forms/{formid}")]
        public async Task<ActionResult> GetFormById(string formid,string collectionId)
        {
            var result =await _formService.GetById(formid, collectionId);
            return Ok(result);
        }
        [HttpDelete("{collectionId}/forms/{formid}")]
        public async Task<IActionResult> DeleteForm(string formid,string collectionId)
        {
            if (!string.IsNullOrEmpty(formid))
            {
                await _formService.Delete(formid, collectionId);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("{collectionId}/forms/{formid}")]
        public async Task<IActionResult> UpdateForm(string formid,string collectionId, FormModelReq  reqForUpdate)
        {
            await _formService.Update(formid,collectionId, reqForUpdate);
            return Ok();
        }
    }
}
