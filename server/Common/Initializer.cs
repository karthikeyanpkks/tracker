using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public class Initializer : IInitializer
    {
        private static DbConfiguration _dbConfiguration;
        public Initializer(DbConfiguration databaseConfiguration)
        {
            _dbConfiguration = databaseConfiguration;
        }

        public static DbConfiguration ConnectionSetting
        {
            get
            {
                return _dbConfiguration;
            }
        }
    }
}
