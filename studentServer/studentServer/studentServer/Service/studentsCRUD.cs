using studentServer.Entity;
using studentServer.TempService;

namespace studentServer.Service
{
    public class studentsCRUD
    {
        public static async Task<List<Student>> getAllStudent(int page)
        {
            List<Student> students = new List<Student>();
            for (int i = 0; i < 5; i++)
            {
                students.Add(studentGenerator.GenerateRandomStudent());
            }

            return students;
        }

        public static async Task<Student> getStudentDataAsync(int idCompany)
        {
            return studentGenerator.GenerateRandomStudent();
        }

        public static async Task deleteStudentsAsync(List<int> idCompany)
        {

        }

        public static async Task patchStudentsyAsync(PatchStudent newStudentsData)
        {

        }

        public static async Task addStudentsAsync(Student newStudentData, int count)
        {

        }
    }
}
