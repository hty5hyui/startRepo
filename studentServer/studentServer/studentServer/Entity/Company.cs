using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studentServer.Entity
{
    [Table("Company")]
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PracticeAddress { get; set; }
        public string? INN { get; set; }
        public string? KPP { get; set; }
        public string? OGRN { get; set; }
        public string? PaymantAccount { get; set; }
        public string? Bank { get; set; }
        public string? CorrespondentAccount { get; set; }
        public string? BIK { get; set; }
        public string? Mail { get; set; }
        public string? Director { get; set; }
        public string? HeadOfTheCompany { get; set; }
        public string? CompanyAddress { get; set; }

        //---------Связь с таблицей Student один ко многим---------
        public virtual ICollection<Student>? Students { get; set; }
    }

    public class CompanyDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PracticeAddress { get; set; }
        public string? INN { get; set; }
        public string? KPP { get; set; }
        public string? OGRN { get; set; }
        public string? PaymantAccount { get; set; }
        public string? Bank { get; set; }
        public string? CorrespondentAccount { get; set; }
        public string? BIK { get; set; }
        public string? Mail { get; set; }
        public string? Director { get; set; }
        public string? HeadOfTheCompany { get; set; }
        public string? CompanyAddress { get; set; }
    }

    public class CompanyNameDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }

}
