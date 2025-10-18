using studentServer.repo;

namespace studentServer.TempService
{
    public class RandomDataSetInBase(companyRepo repository)
    {
        public void setInBaseCompany()
        {
            for (int i = 0; i < 10; i++)
            {
                //repository.SetCompanyAsync(companyGenerator.GenerateRandomCompany()).Wait();
            }    
        }
    }
}
