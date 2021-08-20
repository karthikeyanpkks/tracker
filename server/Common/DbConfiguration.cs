using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Common
{
    public class DbConfiguration
    {
        [JsonProperty("connectionString")]
        public string ConnectionString { get; set; }

        [JsonProperty("database")]
        public string Database { get; set; }
    }
}
