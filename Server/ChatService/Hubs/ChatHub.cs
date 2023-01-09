using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;
public class ChatHub : Hub<IChatHub>
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendMessage(user, message);
    }
}