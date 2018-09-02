
using System;
using System.IO;
using System.Linq;
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
    public static class FetchHighScores
    {
        [FunctionName("FetchHighScores")]
        public async static Task<object> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequestMessage req, ILogger log,
            [Table("UserScores")]CloudTable scores)
        {
            var employeesQuery = await scores.ExecuteQuerySegmentedAsync(new TableQuery<UserScore>(), null);
            var highscores = employeesQuery.Results.ToList();

            var topScores = highscores
                .OrderByDescending(score => score.Score)
                .Take(10).ToList();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonConvert.SerializeObject(topScores), Encoding.UTF8, "application/json")
            };
        }
    }
}
