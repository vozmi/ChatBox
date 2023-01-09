using ChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints => 
{
    endpoints.MapHub<ChatHub>("/hubs/chat");
});

if (builder.Environment.IsDevelopment())
{
    app.UseSpa(config => 
    {
        var spaUrl = builder.Configuration.GetSection("SpaDevelopmentUrl").Value;
        config.UseProxyToSpaDevelopmentServer(spaUrl ?? "http://localhost:3000");
    });
}

app.Run();
