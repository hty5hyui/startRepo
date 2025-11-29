using Aspose.Words;
using studentServer.Entity;
using Syncfusion.DocIO.DLS;

namespace studentServer.Service.FileOperation
{
    public class ConvertFileService
    {
        public static byte[] ConvertWordToPDF(byte[] word)
        {
            using var inputStream = new MemoryStream(word);
            using var outputStream = new MemoryStream();

            Document doc = new Document(inputStream);
            doc.Save(outputStream, SaveFormat.Pdf);

            return outputStream.ToArray();
        }
    }
}
