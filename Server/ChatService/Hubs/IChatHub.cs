using Microsoft.AspNet.SignalR.Hubs;

namespace ChatService.Hubs;
public interface IChatHub
{
    [HubMethodName("MessageSent")]
    Task SendMessage(string author, string message);
}