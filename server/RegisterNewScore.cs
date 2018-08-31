
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
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
            string jsonContent = await req.Content.ReadAsStringAsync();
            dynamic data = JsonConvert.DeserializeObject(jsonContent);
            string username = data.username.ToString();
            string email = data.email.ToString().Trim().ToLower();
            int score = data.score;

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email)) return new BadRequestResult();

            await scores.ExecuteAsync(TableOperation.Insert(new UserScore
            {
                RowKey = Guid.NewGuid().ToString(),
                PartitionKey = "nerd",
                Username = DemystifyUsername(username),
                Email = email,
                Score = score
            }));

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("New score registered")
            };
        }

        public static string DemystifyUsername(string username)
        {
            Regex reg = new Regex("[^a-zA-Z']");
            var trimmedLowerCase = username.Trim().ToLower();
            trimmedLowerCase = reg.Replace(trimmedLowerCase, string.Empty);
            return new string(trimmedLowerCase.Take(10).ToArray());
        }
    }
}
