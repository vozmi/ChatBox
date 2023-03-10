using ChatBox.Server.Hubs;

namespace ChatBox.Server.Configuration;
public static partial class MiddlewareInitializer
{
    public static WebApplication RegisterMiddlewares(this WebApplication app)
    {
        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseAppEndpoints();

        if (app.Environment.IsDevelopment())
        {
            app.UseAppSpa();
        }

        return app;
    }

    private static WebApplication UseAppEndpoints(this WebApplication app)
    {
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("/hubs/chat");
        });

        return app;
    }

    private static WebApplication UseAppSpa(this WebApplication app)
    {
        app.UseSpa(config =>
        {
            var spaUrl = app.Configuration.GetSection("SpaDevelopmentUrl").Value;
            config.UseProxyToSpaDevelopmentServer(spaUrl ?? "http://localhost:3000");
        });

        return app;
    }

}