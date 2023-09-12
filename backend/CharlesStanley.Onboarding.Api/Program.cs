using CharlesStanley.Onboarding.Repository;
using CharlesStanley.Onboarding.Service;
using CharlesStanley.Onboarding.Service.FormService;
using CharlesStanley.Onboarding.Service.Service;
using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using CharlesStanley.Onboarding.Api.Middlewares;
using CharlesStanley.Onboarding.Service.ContainerService;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())
);

builder.Services.AddDbContext<CsOnboardContext>(
    options => options.UseCosmos(accountEndpoint: configuration.GetValue<string>("CosmosDbSetting:URI"),
            databaseName: configuration.GetValue<string>("CosmosDbSetting:DatabaseId"),
            accountKey: configuration.GetValue<string>("CosmosDbSetting:AuthKey")
            ));

// Add services to the container.
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IFormService),typeof(FormService));
builder.Services.AddScoped(typeof(IContainerService), typeof(ContainerService));
builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
MapperConfiguration mapperConfiguration = new MapperConfiguration(x =>
{
    x.AddProfile(new MappingProfile());
});
IMapper mapper = mapperConfiguration.CreateMapper();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddSingleton(mapper);


var app = builder.Build();
app.UseCors();

app.UseMiddleware<GlobalRoutePrefixMiddleware>("/api/v1/collections");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UsePathBase(new PathString("/api/v1/collections"));
app.UseRouting();

app.UseMiddleware<AuthenticationMiddleware>();
//app.UseMiddleware<GlobalExceptionHandler>();
app.UseAuthorization();

app.MapControllers();

app.Run();

