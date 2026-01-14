using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studentServer.Entity.DBEntity
{
    public class Education
    {
        [Key]
        public int Id { get; set; }
        public string? NumberEnrollment1Year { get; set; } // Номер приказа зачисления на 1 курс
        public DateOnly? DateEnrollment1Year { get; set; } // Дата приказа зачисления на 1 курс
        public string? NumberEnrollment2Year { get; set; }
        public DateOnly? DateEnrollment2Year { get; set; }
        public string? NumberEnrollment3Year { get; set; }
        public DateOnly? DateEnrollment3Year { get; set; }
        public string? NumberEnrollment4Year { get; set; }
        public DateOnly? DateEnrollment4Year { get; set; }
        public List<Departure>? Departures { get; set; }
        public string? NumberExpulsion { get; set; } // Номер приказа об отчислении
        public DateOnly? DateExpulsion { get; set; } // Дата приказа об отчислении
        // Навигационное свойство обратно к главной сущности
        public virtual Student Student { get; set; }
    }

    public class EducationDTO
    {
        public int Id { get; set; }
        public string? NumberEnrollment1Year { get; set; } // Номер приказа зачисления на 1 курс
        public DateOnly? DateEnrollment1Year { get; set; } // Дата приказа зачисления на 1 курс
        public string? NumberEnrollment2Year { get; set; }
        public DateOnly? DateEnrollment2Year { get; set; }
        public string? NumberEnrollment3Year { get; set; }
        public DateOnly? DateEnrollment3Year { get; set; }
        public string? NumberEnrollment4Year { get; set; }
        public DateOnly? DateEnrollment4Year { get; set; }
        public List<Departure>? Departures { get; set; }
        public string? NumberExpulsion { get; set; } // Номер приказа об отчислении
        public DateOnly? DateExpulsion { get; set; } // Дата приказа об отчислении
    }

    public class Departure
    {
        [Key]
        public int Id { get; set; }
        public DateOnly DateLeaving { get; set; }
        public string Reason { get; set; }
        public DateOnly? DateReturn { get; set; }
    }

}
