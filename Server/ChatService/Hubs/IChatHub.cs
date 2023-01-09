using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;
public interface IChatHub
{
    [HubMethodName("MessageSent")]
    Task SendMessage(string author, string message);
}