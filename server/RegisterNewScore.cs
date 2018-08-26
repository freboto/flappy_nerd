
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace FlappyNerd
{
    public static class RegisterNewScore
    {
        [FunctionName("RegisterNewScore")]
        public async static Task<object> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequestMessage req, ILogger log,
            [Table("UserScores")]CloudTable scores)
        {
            log.LogInformation("Register new score request recieved");

            string jsonContent = await req.Content.ReadAsStringAsync();
            dynamic data = JsonConvert.DeserializeObject(jsonContent);
            var username = data.username.ToString().Trim().ToLower();
            var email = data.email.ToString().Trim().ToLower();
            var score = data.score;

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email)) return new BadRequestResult();

            await scores.ExecuteAsync(TableOperation.Insert(new UserScore
            {
                RowKey = Guid.NewGuid().ToString(),
                PartitionKey = username,
                Email = email,
                Score = score
            }));

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("New score registered")
            };
        }
    }
}
