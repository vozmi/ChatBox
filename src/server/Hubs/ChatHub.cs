using ChatBox.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatBox.Server.Hubs;
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