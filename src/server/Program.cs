using ChatService.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterApplicationServices();

var app = builder.Build();

app.RegisterMiddlewares();

app.Run();
