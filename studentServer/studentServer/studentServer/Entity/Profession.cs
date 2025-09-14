using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace studentServer.Entity
{
    [Table("Profession")]
    public class Profession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string ProfessionName { get; set; }
        public string ProfessionNumber { get; set; }
        //---------Связь с таблицей Student один ко многим---------
        public virtual ICollection<Student> Students { get; set; }
    }
}
