using Microsoft.EntityFrameworkCore;
using studentServer.Entity;

namespace studentServer.repo.Data
{
    public class AppDbStudentContext : DbContext 
    {
        public AppDbStudentContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Contract> Contract { get; set; }
        public DbSet<FinanceDoc> FinanceDoc { get; set; }
        public DbSet<PersonalData> PersonalData { get; set; }
        public DbSet<VISA> VISA { get; set; }
        public DbSet<Profession> Profession { get; set; }
        public DbSet<Company> Company { get; set; }

    }
}
