using Microsoft.EntityFrameworkCore;
using Npgsql;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{

    public class studentRepo(AppDbStudentContext _dbContext)
    {
        //---------------------------------------------------------------------------------
        //-----------------------Profession------------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<Profession>> GetAllProffesionAsync()
        {
            return await _dbContext.Profession.ToListAsync();
        }

        public async Task<Profession> GetProffesionByIdAsync(int id)
        {
            return await _dbContext.Profession.FindAsync(id);
        }

        public async Task SetProffesionAsync(Profession profession)
        {
            await _dbContext.Profession.AddAsync(profession);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateProffesionAsync(Profession profession)
        {
            _dbContext.Profession.Update(profession);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteProffesionAsync(Profession profession)
        {
            _dbContext.Profession.Remove(profession);
            await _dbContext.SaveChangesAsync();
        }
        //---------------------------------------------------------------------------------
        //-----------------------VISA------------------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<VISA>> GetAllVISAAsync()
        {
            return await _dbContext.VISA.ToListAsync();
        }

        public async Task<VISA> GetVISAByIdAsync(int id)
        {
            return await _dbContext.VISA.FindAsync(id);
        }

        public async Task SetVISAAsync(VISA visa)
        {
            await _dbContext.VISA.AddAsync(visa);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateVISAAsync(VISA visa)
        {
            _dbContext.VISA.Update(visa);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteVISAAsync(VISA visa)
        {
            _dbContext.VISA.Remove(visa);
            await _dbContext.SaveChangesAsync();
        }
        //---------------------------------------------------------------------------------
        //-----------------------PersonalData----------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<PersonalData>> GetAllPersonalDataAsync()
        {
            return await _dbContext.PersonalData.ToListAsync();
        }

        public async Task<PersonalData> GetPersonalDataByIdAsync(int id)
        {
            return await _dbContext.PersonalData.FindAsync(id);
        }

        public async Task SetPersonalDataAsync(PersonalData personalData)
        {
            await _dbContext.PersonalData.AddAsync(personalData);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePersonalDataAsync(PersonalData personalData)
        {
            _dbContext.PersonalData.Update(personalData);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePersonalDataAsync(PersonalData personalData)
        {
            _dbContext.PersonalData.Remove(personalData);
            await _dbContext.SaveChangesAsync();
        }
        //---------------------------------------------------------------------------------
        //-----------------------FinanceDoc------------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<FinanceDoc>> GetAllFinanceDocAsync()
        {
            return await _dbContext.FinanceDoc.ToListAsync();
        }

        public async Task<FinanceDoc> GetFinanceDocByIdAsync(int id)
        {
            return await _dbContext.FinanceDoc.FindAsync(id);
        }

        public async Task SetFinanceDocAsync(FinanceDoc financeDoc)
        {
            await _dbContext.FinanceDoc.AddAsync(financeDoc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateFinanceDocAsync(FinanceDoc financeDoc)
        {
            _dbContext.FinanceDoc.Update(financeDoc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteFinanceDocAsync(FinanceDoc financeDoc)
        {
            _dbContext.FinanceDoc.Remove(financeDoc);
            await _dbContext.SaveChangesAsync();
        }
        //---------------------------------------------------------------------------------
        //-----------------------Contract--------------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<Contract>> GetAllContractAsync()
        {
            return await _dbContext.Contract.ToListAsync();
        }

        public async Task<Contract> GetContractByIdAsync(int id)
        {
            return await _dbContext.Contract.FindAsync(id);
        }

        public async Task SetContractAsync(Contract contract)
        {
            await _dbContext.Contract.AddAsync(contract);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateContractAsync(Contract contract)
        {
            _dbContext.Contract.Update(contract);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteContractAsync(Contract contract)
        {
            _dbContext.Contract.Remove(contract);
            await _dbContext.SaveChangesAsync();
        }
        //---------------------------------------------------------------------------------
        //-----------------------Student---------------------------------------------------
        //---------------------------------------------------------------------------------
        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _dbContext.Students.ToListAsync();
        }

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _dbContext.Students.FindAsync(id);
        }

        public async Task SetStudentAsync(Student student)
        {
            await _dbContext.Students.AddAsync(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateStudentAsync(Student student)
        {
            _dbContext.Students.Update(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteStudentAsync(Student student)
        {
            _dbContext.Students.Remove(student);
            await _dbContext.SaveChangesAsync();
        }
    }
}
