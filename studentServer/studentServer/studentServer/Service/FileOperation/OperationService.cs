using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;
using System.IO.Compression;

namespace studentServer.Service.FileOperation
{
    public class OperationService(studentsCRUD studentsCRUD, documentTemplateCRUD documentTemplateCRUD)
    {
        //Формируем документы, собираем в архив и отправляем массив байт
        internal async Task<byte[]> makeStudentDocumentAsync(OperationEntity operationEntity)
        {
            DocumentTemplate document = await documentTemplateCRUD.GetDocumentTemplateByIdAsync(operationEntity.documentId);
            if (document == null)
            {
                throw new Exception($"Шаблон документа с id={operationEntity.documentId} не обнаружен");
            }

            using (MemoryStream stream = new MemoryStream())
            {
                using (var archive = new ZipArchive(stream, ZipArchiveMode.Create, leaveOpen: true))
                {
                    foreach (int userId in operationEntity.userId)
                    {
                        StudentDataDTO studentDataDTO = await studentsCRUD.getStudentDataAsync(userId);
                        string nameFile = $"{userId} {studentDataDTO.personalData.Surname} {studentDataDTO.personalData.Name} {studentDataDTO.personalData.Patronymic} {document.DocumentName}.docx";
                        byte[] dataFile = WordReplacer.BaseReplace(document.Content!, studentDataDTO);

                        ZipArchiveEntry entry = archive.CreateEntry(nameFile, CompressionLevel.Fastest);

                        // Записываем байты документа в архив
                        using (Stream entryStream = entry.Open())
                        {
                            await entryStream.WriteAsync(dataFile, 0, dataFile.Length);
                        }
                    }
                }

                return stream.ToArray();
            }  
        }
    }
}
