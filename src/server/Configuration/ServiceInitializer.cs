namespace ChatBox.Server.Configuration;
public static class ServiceInitializer
{
    public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddSignalR();
        
        return services;
    }
}