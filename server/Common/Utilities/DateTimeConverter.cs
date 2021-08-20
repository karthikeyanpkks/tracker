using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Common.Utilities
{
    public class DateTimeConverter
    {
        public static DateTime ToDateTime(string datetime)
        {
            var dueDate = DateTime.Now;
            // try to convert date
            try
            {
                dueDate = Convert.ToDateTime(datetime, CultureInfo.CreateSpecificCulture("en-IN"));
            }
            catch
            {
                dueDate = Convert.ToDateTime(datetime, CultureInfo.InvariantCulture);
            }

            return dueDate;
        }
    }
}
