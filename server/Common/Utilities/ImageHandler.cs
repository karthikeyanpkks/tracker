using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

namespace Common.Utilities
{
    public class ImageHandler
    {
        public static bool CreateImage(string base64String, string path, string fileName)
        {
            try
            {
                //data:image/gif;base64,
                //this image is a single pixel (black)
                byte[] bytes = Convert.FromBase64String(base64String);

                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                fileName = Path.Combine(path, fileName);
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    Image.FromStream(ms).Save(fileName, ImageFormat.Jpeg);
                }

                return true;
            }
            catch (Exception)
            {
                // TODO:: Add Log
                return false;
            }
        }

        public static string GetImage(string path)
        {
            try
            {
                using (Image image = Image.FromFile(path))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);
                        return base64String;
                    }
                }
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}
