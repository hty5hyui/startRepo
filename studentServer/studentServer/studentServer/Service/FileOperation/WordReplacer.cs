using studentServer.Entity.DBEntity;
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
            using MemoryStream inputStream = new MemoryStream(word);
            using MemoryStream outputStream = new MemoryStream();

            Formatting highlightFormat = new Formatting();
            highlightFormat.Highlight = Highlight.yellow;

            Dictionary<string, string?> dictinaryData = ReplacePlaceholderDictionaryService.BuildDictionary(studentData);            

            using (DocX document = DocX.Load(inputStream))
            {
                foreach (string key in dictinaryData.Keys)
                {
                    if(document.FindAll(key).Count() > 0)
                    {
                        if(dictinaryData[key] == null)
                        {
                            throw new Exception($"Ошибка добавления данных пользователя: поле {key} для данного человека не записано в базе");
                        }

                        StringReplaceTextOptions options = new StringReplaceTextOptions
                        {
                            SearchValue = key,
                            NewValue = dictinaryData[key],
                            TrackChanges = false
                        };
                        document.ReplaceText(options);
                    }  
                }
                
                document.SaveAs(outputStream);
            }

            return outputStream.ToArray();
        }
    }
}
