using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Common.Utilities
{
    public class MoneyFormatter
    {
        public static string ConvertMoney(double value)
        {
            return value.ToString("N", CultureInfo.CreateSpecificCulture("en-IN"));
        }

        public static string ConvertMoneyWithSymbol(double value)
        {
            return value.ToString("C", CultureInfo.CreateSpecificCulture("en-IN"));
        }
    }
}
