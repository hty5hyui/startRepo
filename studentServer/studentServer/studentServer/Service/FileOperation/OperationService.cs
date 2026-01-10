using Microsoft.Extensions.Caching.Memory;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;
using System.Drawing;
using System.IO.Compression;
using Xceed.Words.NET;

namespace studentServer.Service.FileOperation
{
    public class OperationService(studentsCRUD studentsCRUD, documentTemplateCRUD documentTemplateCRUD, companyCRUD companyCRUD, LogService logger, IMemoryCache cache)
    {
        //Формируем документы, собираем в архив и отправляем массив байт
        internal async Task makeStudentDocumentAsync(OperationEntity operationEntity, string ticketId)
        {
            
            int processedCount = 0;
            int totalStudents = operationEntity.userId.Count();

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
                        Company company = new Company();
                        if (studentDataDTO.student.CompanyId != null)
                        {
                             company = await companyCRUD.getCompanyDataAsync((int)studentDataDTO.student.CompanyId);
                        }
                        string nameFile = $"{userId} {studentDataDTO.personalData.Surname} {studentDataDTO.personalData.Name} {studentDataDTO.personalData.Patronymic} {document.DocumentName}.docx";
                        try
                        {
                            byte[] dataFile = WordReplacer.BaseReplace(document.Content!, studentDataDTO, company);
                            //Создаем объект
                            ZipArchiveEntry entry = archive.CreateEntry(nameFile, CompressionLevel.Fastest);

                            // Записываем байты документа в архив
                            using (Stream entryStream = entry.Open())
                            {
                                await entryStream.WriteAsync(dataFile, 0, dataFile.Length);
                            }
                        }
                        catch (Exception ex)
                        {
                            string errorFileName = $"[ОШИБКА] {nameFile}";
                            ZipArchiveEntry errorEntry = archive.CreateEntry(errorFileName, CompressionLevel.Fastest);
                            using (var errorMemStream = new MemoryStream())
                            {
                                // Создаем документ Xceed
                                using (var errorDoc = DocX.Create("ErrorLog"))
                                {
                                    errorDoc.InsertParagraph($"Не удалось сформировать документ")
                                            .FontSize(14)
                                            .Color(Xceed.Drawing.Color.Red)
                                            .Bold();

                                    errorDoc.InsertParagraph("Текст ошибки:")
                                            .Bold()
                                            .UnderlineColor(Xceed.Drawing.Color.Black);

                                    errorDoc.InsertParagraph(ex.Message).SpacingAfter(15);

                                    errorDoc.SaveAs(errorMemStream);
                                }

                                errorMemStream.Position = 0;
                                // Копируем созданный docx в архив
                                using (Stream entryStream = errorEntry.Open())
                                {
                                    await errorMemStream.CopyToAsync(entryStream);
                                }
                            }
                        }
                        processedCount++;
                        int currentPercent = (int)((double)processedCount / totalStudents * 100);
                        if (currentPercent >= 100) currentPercent = 99;

                        if (cache.TryGetValue(ticketId, out ProgressEntity? activeStatus))
                        {
                            activeStatus.Progress = currentPercent;
                        }

                    }
                }
                //Сохраняем результат в кеш
                try
                {
                    byte[] data = stream.ToArray();
                    if(cache.TryGetValue(ticketId, out ProgressEntity? progressEntity))
                    {
                        progressEntity.ResultData = data;
                        progressEntity.IsReady = true;
                        progressEntity.Progress = 100;
                    }
                }
                catch(Exception ex)
                {
                    if (cache.TryGetValue(ticketId, out ProgressEntity? status))
                    {
                        status.Error = ex.Message;
                        status.IsReady = true;
                    }
                } 
            }  
        }
    }
}
