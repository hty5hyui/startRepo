using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace studentServer.Entity
{
    public class Contract
    {
        public int Id { get; set; }
        public string NumberUVM { get; set; }
        public string Number3Party { get; set; }
        public DateTime? Date3Party { get; set; }
        public string Number2Party { get; set; }
        public DateTime? Date2Party { get; set; }
        public string GroupNumber { get; set; }
        public DateTime? DateOfDispatch { get; set; }
        public string MailCompany { get; set; }
        public DateTime? DateReturn { get; set; }
    }
}
