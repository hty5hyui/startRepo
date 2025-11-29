using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace studentServer.Entity.DBEntity
{
    [Table("Curator")]
    public class Curator
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }

        //---------Связь с таблицей Student один ко многим---------
        public virtual ICollection<Student>? Students { get; set; }

    }

    public class CuratorDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}
