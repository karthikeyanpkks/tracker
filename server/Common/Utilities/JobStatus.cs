using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Utilities
{
    public enum JobStatus
    {
        Open,
        Inprogress,
        Cancelled,
        Rescheduled,
        Loosed,
        Confirmed,
        InternalOrder,
        Production,
        Completed,
        Closed
    }
}
