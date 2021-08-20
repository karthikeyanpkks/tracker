using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Common
{
    public class SmsConfiguration
    {
        [JsonProperty("smsUrl")]
        public string SmsUrl { get; set; }
        [JsonProperty("smsApiKey")]
        public string SmsApiKey { get; set; }
        [JsonProperty("sender")]
        public string Sender { get; set; }
        [JsonProperty("sendTo")]
        public string SendTo { get; set; }

        [JsonProperty("isEnabled")]
        public bool IsEnabled { get; set; }
    }
}
