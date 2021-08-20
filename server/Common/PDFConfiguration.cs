using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Common
{
    public class PDFConfiguration
    {
        [JsonProperty("pdfServiceUrl")]
        public string PDFServiceUrl { get; set; }

        [JsonProperty("pdfConvertByService")]
        public bool PDFConvertByService { get; set; }

        [JsonProperty("baseUrl")]
        public string BaseUrl { get; set; }
    }
}
