namespace studentServer.Service
{
    public class htmlGenerator
    {
        public static async Task<string> mainPageGenerator()
        {
            string htmlPage = await System.IO.File.ReadAllTextAsync("Views/main.html");
            return htmlPage;
        }
    }
}
