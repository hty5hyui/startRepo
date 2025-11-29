using System.Buffers;
using System.Text.RegularExpressions;
using studentServer.Entity.DBEntity;
using Syncfusion.DocIO.DLS;
using Xceed.Document.NET;
using Xceed.Words.NET;


namespace studentServer.Service.FileOperation
{
    public class WordReplacer
    {
        public WordReplacer()
        {
            
        }

        public static byte[] PlaceholderReplace(byte[] word)
        {
            using var inputStream = new MemoryStream(word);
            using var outputStream = new MemoryStream();

            Formatting highlightFormat = new Formatting();
            highlightFormat.Highlight = Highlight.yellow;


            StringReplaceTextOptions options = new StringReplaceTextOptions
            {
                SearchValue = "{Name}",
                NewValue = "Иван Иванов",
                NewFormatting = highlightFormat

            };

            using (DocX document = DocX.Load(inputStream))
            {
                document.ReplaceText(options);
                document.SaveAs(outputStream);
            }

            return outputStream.ToArray();
        }

        public static byte[] BaseReplace(byte[] word, StudentDataDTO studentData)
        {
            using var inputStream = new MemoryStream(word);
            using var outputStream = new MemoryStream();

            Formatting highlightFormat = new Formatting();
            highlightFormat.Highlight = Highlight.yellow;


            StringReplaceTextOptions options = new StringReplaceTextOptions
            {
                SearchValue = "{Name}",
                NewValue = "Иван Иванов",
                TrackChanges = false
            };

            using (DocX document = DocX.Load(inputStream))
            {
                document.ReplaceText(options);
                document.SaveAs(outputStream);
            }

            return outputStream.ToArray();
        }
    }
}
