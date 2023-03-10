using ChatBox.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatBox.Server.Hubs;
public interface IChatHub
{
    [HubMethodName("MessageSent")]
    Task SendMessage(Message message);
}