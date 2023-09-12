using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharlesStanley.Onboarding.Domain
{
    public class CsOnboardingForm
    {
        public string Id { get; set; }
        public string ContainerId { get; set; }
        public string Name { get; set; }
        public List<ElementsDto> Elements { get; set; }
        public DateTime CreatedAt { get; set; }

        
    }
}
