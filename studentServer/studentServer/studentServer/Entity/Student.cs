using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentServer.Entity
{
    public class StudentDataDTO
    {
        public StudentDTO student{ get; set; } = new StudentDTO();
        public ContractDTO contract { get; set; } = new ContractDTO();
        public FinanceDocDTO financeDoc { get; set; } = new FinanceDocDTO();
        public PersonalDataDTO personalData { get; set; } = new PersonalDataDTO();
        public VISADTO visa { get; set; } = new VISADTO();
    }

    public class PatchStudent
    {
        public List<int> idList { get; set; } = [];
        public StudentDataDTO data { get; set; } = new StudentDataDTO();
    }

    public class StudentPreview
    {
        public int Id { get; set; }
        public string? Surname { get; set; }
        public string? Name { get; set; }
        public string? Patronymic { get; set; }
        public string? PassportSeries { get; set; }
        public string? PassportNumber { get; set; }
        public string? GroupNumber { get; set; }
        public string? CompanyName { get; set; }
        public string? ProfessionName { get; set; }
        public string? Curator { get; set; }
    }

    //Изменил на более простую структуру
    [Table("Student")]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        public int? ProfessionId { get; set; }
        public int? CuratorId { get; set; }

        //---------Связь с таблицами через внешние ключи---------
        public virtual PersonalData PersonalData { get; set; }
        public virtual FinanceDoc FinanceDoc { get; set; }
        public virtual Contract Contract { get; set; }
        public virtual VISA VISA { get; set; }

        //---------Связь с таблицами Company, Curator и Profession через внешние ключи---------
        public virtual Company? Company { get; set; }
        public virtual Profession? Profession { get; set; }
        public virtual Curator? Curator { get; set; }

    }

    public class StudentDTO
    {
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        public int? ProfessionId { get; set; }
        public int? CuratorId { get; set; }
    }
}
