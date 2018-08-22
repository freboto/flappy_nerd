using Microsoft.WindowsAzure.Storage.Table;

namespace FlappyNerd
{
    public class UserScore : TableEntity
    {
        public string Username => PartitionKey;
        public string Email { get; set; }
        public string Score { get; set; }
    }
}
