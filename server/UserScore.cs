using Microsoft.WindowsAzure.Storage.Table;

namespace FlappyNerd
{
    public class UserScore : TableEntity
    {
        private string username;
        public string Username
        {
            get
            {
                return this.PartitionKey != "nerd" ? this.PartitionKey : username;
            }
            set
            {
                this.username = value;
            }
        }
        public string Email { get; set; }
        public int Score { get; set; }
    }
}
