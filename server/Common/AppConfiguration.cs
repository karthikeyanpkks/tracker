using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Common
{
    public class AppConfiguration
    {
        [JsonProperty("smsConfiguration")]
        public SmsConfiguration SmsConfiguration { get; set; }

        [JsonProperty("databaseConfiguration")]
        public DbConfiguration DatabaseConfiguration { get; set; }

        [JsonProperty("secret")]
        public string Secret { get; set; }

        [JsonProperty("currencyUrl")]
        public string CurrencyUrl { get; set; }

        [JsonProperty("pdfConfiguration")]
        public PDFConfiguration PDFConfiguration { get; set; }
    }
}
