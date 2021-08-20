using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Utilities
{
    public class AppConstant
    {
        public static string JobCodePattern = "ABLE/JOB/{1}/{2}";
        public static string DocsRootPath = @"Documents";

        // Add , if more than 1 mail id
        public static string BccMailIds = "karthikeyan@antbuild.in";
        public static string DateTimeFormate = "dd/MM/yyyy h:mm tt";
        public static string DateFormate = "dd/MM/yyyy";
        public static string ClientUrl = "https://black-coast-0429d1f00.azurestaticapps.net/";
        public static string InternalOrderUrlPattern = "{0}internal/view/{1}";
        public static string DefaultSignature = "User";

        // mail's
        public static string QuotationMailSubject = "Able-elect Quotation - [jobcode]";
        public static string InternalOrderMailSubject = "Able-elect- Approval Required for Internal Order - [jobcode]";
        public static string InternalOrderApprovedMailSubject = "Internal Order Approved - [jobcode]";
        public static string ProFormaMailSubject = "Able-elect ProForma Invoice - [jobcode]";

        public static string PurchaseOrderMailSubject = "Able-elect- Purchase order - [poNumber]";

        public static string WelcomeMailBody = "Welcome to Able Electronic Services";
    }
}
