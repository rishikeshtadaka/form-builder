using CharlesStanley.Onboarding.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using Newtonsoft.Json.Linq;
using System.Security.Cryptography.Xml;
using Newtonsoft.Json;
using System.Net;
using System.Runtime.CompilerServices;

namespace CharlesStanley.Onboarding.Repository
{
    public class CsOnboardContext : DbContext
    {
        public DbSet<CsOnboardingForm>? formbuilder { get; set; }
        public DbSet<ElementsDto>? elements { get; set; }

        public DbSet<ContainerDto>? containers { get; set; }
        public CsOnboardContext(DbContextOptions<CsOnboardContext> options) : base(options)
        {
           
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseCosmos("https://teknath-acc.documents.azure.com:443/",
                "yOy8n41Sagfwo78m77ASiRzxGauTz9W1ZBXHkyA3mpiaQdUl7UX6Wp5QU4HlJfEatDYdBjOmN5xbACDbGN8sqA==",
                "cs-onboard");
        }
         
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CsOnboardingForm>()
                .ToContainer("forms")
                .HasPartitionKey(c => c.Id);

            modelBuilder.Entity<CsOnboardingForm>()
                .OwnsMany(x => x.Elements).OwnsMany(x => x.Elements)
                .OwnsMany(x=>x.Elements)
                .Property<JObject>("Configurations");
                

           //Entity for Container
            modelBuilder.Entity<ContainerDto>()
                .ToContainer("containers")
                .HasPartitionKey(x => x.Id);
        }     
       
    }

}
