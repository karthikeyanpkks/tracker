using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Common
{
    public class AppDateTime
    {
        public static DateTime CurrentDate()
        {
            return DateTime.Now;
        }

        /// <summary>
        /// get local time zone date
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime GetLocalDate(DateTime? dateTime)
        {
            var date = dateTime ?? new DateTime();
            return date.ToLocalTime();
        }

        public static DateTime ToDateTime(string datetime)
        {
            DateTime dueDate;
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

        public static string GetCurrentFinancialYear()
        {
            int CurrentYear = DateTime.Today.Year;
            int PreviousYear = DateTime.Today.Year - 1;
            int NextYear = DateTime.Today.Year + 1;
            string PreYear = PreviousYear.ToString().Substring(2, 2);
            string NexYear = NextYear.ToString().Substring(2, 2);
            string CurYear = CurrentYear.ToString().Substring(2, 2);
            string FinYear = null;

            if (DateTime.Today.Month > 3)
                FinYear = CurYear + NexYear;
            else
                FinYear = PreYear + CurYear;
            return FinYear.Trim();
        }

        public static Tuple<DateTime, DateTime> GetCurrentMonthStartEndDate()
        {
            var now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            return new Tuple<DateTime, DateTime>(startDate, endDate);
        }
    }
}
