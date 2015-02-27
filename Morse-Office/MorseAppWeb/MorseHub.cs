using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace MorseAppWeb
{
    [HubName("morseHub")]
    public class MorseHub : Hub
    {
        public void Initialize()
        {
            PollBuffer();
        }

        private void PollBuffer()
        {
            Action<CancellationToken> workItem = PostToRemoteService;
            HostingEnvironment.QueueBackgroundWorkItem(workItem);
        }

        private async void PostToRemoteService(CancellationToken cancellationToken)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("http://morse-office-webapi.azurewebsites.net/api/Text", cancellationToken);
                string result = await response.Content.ReadAsStringAsync();
                SendMessage(result.Trim('"'));
            }
            Thread.Sleep(500);
            PollBuffer();
        }

        public void SendMessage(string message)
        {
            if (string.IsNullOrWhiteSpace(message)) return;
            //send the message to the specific client passed in
            Clients.All.sendMessage(message);
        }
    }
}