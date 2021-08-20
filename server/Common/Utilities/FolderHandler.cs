using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace Common.Utilities
{
    public class FolderHandler
    {
        public static void Rename(string sourceFile, string destinationFile)
        {
            for (int count = 1; count <= 3; ++count)
            {
                try
                {
                    // To move a file or folder to a new location:
                    if (Directory.Exists(sourceFile))
                    {
                        if (!Directory.Exists(destinationFile))
                            Directory.Move(sourceFile, destinationFile);
                        else
                        {
                            // TODO Log
                        }
                    }
                    break; // When done we can break loop
                }
                catch when (count <= 3)
                {
                    // You may check error code to filter some exceptions, not every error
                    // can be recovered.
                    Thread.Sleep(1000);
                }
            }
        }
    }
}
