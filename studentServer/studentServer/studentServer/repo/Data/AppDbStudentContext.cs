using Microsoft.EntityFrameworkCore;
using studentServer.Entity;

namespace studentServer.repo.Data
{
    public class AppDbStudentContext : DbContext 
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Contract> Contract { get; set; }
        public DbSet<FinanceDoc> FinanceDoc { get; set; }
        public DbSet<PersonalData> PersonalData { get; set; }
        public DbSet<VISA> VISA { get; set; }
        public DbSet<Profession> Profession { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Curator> Curator { get; set; }

        public AppDbStudentContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Конфигурация для связи Student <--> Contract
            modelBuilder.Entity<Student>()
                .HasOne(main => main.Contract)
                .WithOne(pi => pi.Student)
                .HasForeignKey<Contract>(pi => pi.Id); // Внешним ключом в Contract является его собственный Id

            // Конфигурация для связи Student <--> FinanceDoc
            modelBuilder.Entity<Student>()
                .HasOne(main => main.FinanceDoc)
                .WithOne(pi => pi.Student)
                .HasForeignKey<FinanceDoc>(pi => pi.Id); // Внешним ключом в FinanceDoc является его собственный Id

            // Конфигурация для связи Student <--> PersonalData
            modelBuilder.Entity<Student>()
                .HasOne(main => main.PersonalData)
                .WithOne(pi => pi.Student)  
                .HasForeignKey<PersonalData>(pi => pi.Id); // Внешним ключом в PersonalData является его собственный Id

            // Конфигурация для связи Student <--> VISA
            modelBuilder.Entity<Student>()
                .HasOne(main => main.VISA)
                .WithOne(pi => pi.Student)
                .HasForeignKey<VISA>(pi => pi.Id); // Внешним ключом в VISA является его собственный Id
        }
    }
}
