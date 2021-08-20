using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Common.Utilities
{
    public class FileFormatter
    {
        public static string FilterFileName(string fileName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(fileName))
                    throw new ArgumentNullException(nameof(fileName));

                if (fileName.Contains("\\"))
                {
                    var filePaths = fileName.Split("\\");
                    if (filePaths?.Count() > 0)
                    {
                        fileName = filePaths.LastOrDefault();
                    }
                }
                int? val = fileName?.Trim('"')?.Replace(" ", "")?.IndexOf("(");
                if (val != null && val != -1)
                {
                    fileName = $"{fileName.Substring(0, fileName.IndexOf("("))}{Path.GetExtension(fileName)}";
                }

                return fileName.Replace(" ", "").Trim().ToUpper();
            }
            catch (Exception)
            {
                // TODO:: Mail alert required;
                return fileName;
            }
        }

        public static string GetQuoationFolder(string jobId)
        {
            return $"{AppConstant.DocsRootPath}/Quotation/{jobId}/quotation";
        }

        public static string GetProFormaFolder(string jobId)
        {
            return $"{AppConstant.DocsRootPath}/Quotation/{jobId}/proforma";
        }

        public static string GetQuoationFileName(string quoationCode)
        {
            return $"{quoationCode.Replace("/", "_")}.pdf";
        }

        public static string GetProFormaFileName(string quoationCode)
        {
            return $"{quoationCode.Replace("QUO", "PFI").Replace("/", "_")}.pdf";
        }

        // internal order
        public static string GetInternalFolder(string jobId)
        {
            return $"{AppConstant.DocsRootPath}/Quotation/{jobId}/internalorder";
        }

        public static string GetInternalOrderFileName(string jobCode)
        {
            return $"{jobCode.Replace("/", "_")}.pdf";
        }

        public static string GetPurchaseOrderFolder(string poId)
        {
            return $"{AppConstant.DocsRootPath}/PurchaseOrder/{poId}";
        }

        public static string GetFileName(string fileName)
        {
            return $"{fileName.Replace("/", "_")}.pdf";
        }

        public static string GetProFormaCode(string quotation)
        {
            return quotation.Replace("QUO", "PFI");
        }
    }
}
