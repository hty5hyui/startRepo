using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studentServer.Entity.DBEntity
{
    [Table("Company")]
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? NameCompanyRF { get; set; } //Название компании в РФ
        public string? NameCompanyKNDR { get; set; } //Название компании в КНДР
        public string? PracticeAddress { get; set; }
        public string? INN { get; set; }
        public string? KPP { get; set; }
        public string? OGRN { get; set; }
        public string? PaymantAccount { get; set; }
        public string? Bank { get; set; }
        public string? CorrespondentAccount { get; set; }
        public string? BIK { get; set; }
        public string? Mail { get; set; }
        public string? CompanyActivities { get; set; } //Вид деятельности компании
        public string? Director { get; set; }
        public string? PostHeadOfTheCompany { get; set; } //Должность руководителя компании
        public string? HeadOfTheCompany { get; set; }
        public string? CompanyAddress { get; set; }
        public string? Curator { get; set; }

        //---------Связь с таблицей Student один ко многим---------
        public virtual ICollection<Student>? Students { get; set; }
    }

    public class CompanyDTO
    {
        public int Id { get; set; }
        public string? NameCompanyRF { get; set; } //Название компании в РФ
        public string? NameCompanyKNDR { get; set; } //Название компании в КНДР
        public string? PracticeAddress { get; set; }
        public string? INN { get; set; }
        public string? KPP { get; set; }
        public string? OGRN { get; set; }
        public string? PaymantAccount { get; set; }
        public string? Bank { get; set; }
        public string? CorrespondentAccount { get; set; }
        public string? BIK { get; set; }
        public string? Mail { get; set; }
        public string? CompanyActivities { get; set; } //Вид деятельности компании
        public string? Director { get; set; }
        public string? PostHeadOfTheCompany { get; set; } //Должность руководителя компании
        public string? HeadOfTheCompany { get; set; }
        public string? CompanyAddress { get; set; }
        public string? Curator { get; set; }
    }

    public class CompanyNameDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }

}
