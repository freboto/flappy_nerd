using System;
using Azure;
using Azure.Data.Tables;

namespace FlappyNerd
{
    public class UserScore : ITableEntity
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
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
