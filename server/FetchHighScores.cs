using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Azure.Data.Tables;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FlappyNerd
{
    public static class FetchHighScores
    {
        [FunctionName("FetchHighScores")]
        public async static Task<object> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequestMessage req, ILogger log,
            [Table("UserScores")] TableClient scores)
        {
            var userScores = await scores.QueryAsync<UserScore>().ToListAsync();

            var topScores = userScores
                .OrderByDescending(score => score.Score)
                .Take(50).ToList();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonConvert.SerializeObject(topScores), Encoding.UTF8, "application/json")
            };
        }
    }
}
