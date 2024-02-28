using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace back.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        public async override Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());

            await base.OnDisconnectedAsync(exception);
        }
    }
}