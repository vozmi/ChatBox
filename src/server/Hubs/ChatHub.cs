using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;
public class ChatHub : Hub<IChatHub>
{
    public async Task SendMessage(string user, string message)
    {
        var msg = new Message
        {
            Author = user,
            Body = message,
            Sent = DateTime.UtcNow
        };
        await Clients.All.SendMessage(msg);
    }
}