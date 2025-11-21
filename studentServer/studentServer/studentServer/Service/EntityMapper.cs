using studentServer.Entity;

namespace studentServer.Service
{
    /// <summary>
    /// Класс для преобразования между сущностями и DTO.
    /// </summary>
    public class EntityMapper
    {
        //----------------------------------------------------------------------------------------------------
        public static Student ToStudent(StudentDTO studentDTO)
        {
            if (studentDTO == null)
            {
                throw new ArgumentNullException(nameof(studentDTO));
            }

            return new Student
            {
                Id = studentDTO.Id == null ? 0 : (int)studentDTO.Id,
                CompanyId = studentDTO.CompanyId,
                ProfessionId = studentDTO.ProfessionId,
                CuratorId = studentDTO.CuratorId
            };
        }

        public static StudentDTO ToStudentDTO(Student student)
        {
            if (student == null) throw new ArgumentNullException(nameof(student));

            return new StudentDTO
            {
                Id = student.Id,
                CompanyId = student.CompanyId,
                ProfessionId = student.ProfessionId,
                CuratorId = student.CuratorId
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static ContractDTO ToContractDTO(Contract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));

            return new ContractDTO
            {
                Id = contract.Id,
                NumberUVM = contract.NumberUVM,
                Number3Party = contract.Number3Party,
                Date3Party = contract.Date3Party,
                Number2Party = contract.Number2Party,
                Date2Party = contract.Date2Party,
                GroupNumber = contract.GroupNumber,
                DateOfDispatch = contract.DateOfDispatch,
                MailCompany = contract.MailCompany,
                DateReturn = contract.DateReturn
            };
        }
        public static Contract ToContract(ContractDTO contractDTO)
        {
            if (contractDTO == null) throw new ArgumentNullException(nameof(contractDTO));

            return new Contract
            {
                Id = contractDTO.Id == null ? 0 : (int)contractDTO.Id,
                NumberUVM = contractDTO.NumberUVM,
                Number3Party = contractDTO.Number3Party,
                Date3Party = contractDTO.Date3Party,
                Number2Party = contractDTO.Number2Party,
                Date2Party = contractDTO.Date2Party,
                GroupNumber = contractDTO.GroupNumber,
                DateOfDispatch = contractDTO.DateOfDispatch,
                MailCompany = contractDTO.MailCompany,
                DateReturn = contractDTO.DateReturn
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static PersonalDataDTO ToPersonalDataDTO(PersonalData personalData)
        {
            if (personalData == null) throw new ArgumentNullException(nameof(personalData));

            return new PersonalDataDTO
            {
                Id = personalData.Id,
                Surname = personalData.Surname,
                Name = personalData.Name,
                Patronymic = personalData.Patronymic,
                SurnameEn = personalData.SurnameEn,
                NameEn = personalData.NameEn,
                PatronymicEn = personalData.PatronymicEn,
                Birthday = personalData.Birthday,
                PassportSeries = personalData.PassportSeries,
                PassportNumber = personalData.PassportNumber,
                PassportDateOfIssue = personalData.PassportDateOfIssue,
                PassportDateEnd = personalData.PassportDateEnd,
                PlaceOfBirth = personalData.PlaceOfBirth,
                CityOfRegistration = personalData.CityOfRegistration,
                AddressRegistration = personalData.AddressRegistration,
                AddressRegistrationIndex = personalData.AddressRegistrationIndex
            };
        }

        public static PersonalData ToPersonalData(PersonalDataDTO personalDataDTO)
        {
            if (personalDataDTO == null) throw new ArgumentNullException(nameof(personalDataDTO));

            return new PersonalData
            {
                Id = personalDataDTO.Id == null ? 0 : (int)personalDataDTO.Id,
                Surname = personalDataDTO.Surname,
                Name = personalDataDTO.Name,
                Patronymic = personalDataDTO.Patronymic,
                SurnameEn = personalDataDTO.SurnameEn,
                NameEn = personalDataDTO.NameEn,
                PatronymicEn = personalDataDTO.PatronymicEn,
                Birthday = personalDataDTO.Birthday,
                PassportSeries = personalDataDTO.PassportSeries,
                PassportNumber = personalDataDTO.PassportNumber,
                PassportDateOfIssue = personalDataDTO.PassportDateOfIssue,
                PassportDateEnd = personalDataDTO.PassportDateEnd,
                PlaceOfBirth = personalDataDTO.PlaceOfBirth,
                CityOfRegistration = personalDataDTO.CityOfRegistration,
                AddressRegistration = personalDataDTO.AddressRegistration,
                AddressRegistrationIndex = personalDataDTO.AddressRegistrationIndex
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static FinanceDocDTO ToFinanceDocDTO(FinanceDoc financeDoc)
        {
            if (financeDoc == null) throw new ArgumentNullException(nameof(financeDoc));

            return new FinanceDocDTO
            {
                Id = financeDoc.Id,
                PaymentOfContribution = financeDoc.PaymentOfContribution,
                PaymentOfContributionYear = financeDoc.PaymentOfContributionYear,
                CheckNumber = financeDoc.CheckNumber,
                CheckDate = financeDoc.CheckDate,
                CardIsReady = financeDoc.CardIsReady,
                CardIsGet = financeDoc.CardIsGet
            };
        }

        public static FinanceDoc ToFinanceDoc(FinanceDocDTO financeDocDTO)
        {
            if (financeDocDTO == null) throw new ArgumentNullException(nameof(financeDocDTO));

            return new FinanceDoc
            {
                Id = financeDocDTO.Id == null ? 0 : (int)financeDocDTO.Id,
                PaymentOfContribution = financeDocDTO.PaymentOfContribution,
                PaymentOfContributionYear = financeDocDTO.PaymentOfContributionYear,
                CheckNumber = financeDocDTO.CheckNumber,
                CheckDate = financeDocDTO.CheckDate,
                CardIsReady = financeDocDTO.CardIsReady,
                CardIsGet = financeDocDTO.CardIsGet
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static VISADTO ToVISADTO(VISA visa)
        {
            if (visa == null) throw new ArgumentNullException(nameof(visa));

            return new VISADTO
            {
                Id = visa.Id,
                InviteNumber = visa.InviteNumber,
                ArrivalDate = visa.ArrivalDate,
                VisaId = visa.VisaId,
                VisaSeries = visa.VisaSeries,
                VisaNumber = visa.VisaNumber,
                VisaIssueDate = visa.VisaIssueDate,
                VisaReceiptDate = visa.VisaReceiptDate,
                VisaValidityDate = visa.VisaValidityDate
            };
        }
        public static VISA ToVISA(VISADTO visaDTO)
        {
            if (visaDTO == null) throw new ArgumentNullException(nameof(visaDTO));

            return new VISA
            {
                Id = visaDTO.Id == null ? 0 : (int)visaDTO.Id,
                InviteNumber = visaDTO.InviteNumber,
                ArrivalDate = visaDTO.ArrivalDate,
                VisaId = visaDTO.VisaId,
                VisaSeries = visaDTO.VisaSeries,
                VisaNumber = visaDTO.VisaNumber,
                VisaIssueDate = visaDTO.VisaIssueDate,
                VisaReceiptDate = visaDTO.VisaReceiptDate,
                VisaValidityDate = visaDTO.VisaValidityDate
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static ProfessionDTO ToProfessionDTO(Profession profession)
        {
            if (profession == null) throw new ArgumentNullException(nameof(profession));

            return new ProfessionDTO
            {
                Id = profession.Id,
                ProfessionName = profession.ProfessionName,
                ProfessionNumber = profession.ProfessionNumber
            };
        }
        public static Profession ToProfession(ProfessionDTO professionDTO)
        {
            if (professionDTO == null) throw new ArgumentNullException(nameof(professionDTO));

            return new Profession
            {
                Id = professionDTO.Id,
                ProfessionName = professionDTO.ProfessionName,
                ProfessionNumber = professionDTO.ProfessionNumber
            };
        }
        //----------------------------------------------------------------------------------------------------
        public static StudentDataDTO ToStudentDataDTO(StudentGroupDataDTO data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));

            return new StudentDataDTO
            {
                student = data.student,
                contract = data.contract,
                financeDoc = data.financeDoc,
                personalData = data.personalData,
                visa = data.visa
            };
        }
        //----------------------------------------------------------------------------------------------------
    }
}
