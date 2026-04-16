using DeploymentRegistry.Api.Configuration;
using DeploymentRegistry.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb"));

builder.Services.AddSingleton<IDeploymentService, DeploymentService>();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
