using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;
using System.Linq;

namespace studentServer.repo
{
    public class documentTemplateRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 30;

        public async Task UploadDocumentTemplateAsync(DocumentTemplate documentTemplate)
        {
            await _dbContext.DocumentTemplate.AddAsync(documentTemplate);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<DocumentTemplate> GetDocumentTemplateByIdAsync(int id)
        {
            return await _dbContext.DocumentTemplate.FindAsync(id);
        }

        public async Task<List<DocumentTemplate>> GetAllPreviewDocumentTemplateAsync(int page)
        {
            List<DocumentTemplate> documentTemplatesPreview = await _dbContext.DocumentTemplate
                                                                              .OrderByDescending(i => i.Id)
                                                                              .Skip((page - 1) * pageSize)
                                                                              .Take(pageSize)
                                                                              .Select(dt => new DocumentTemplate
                                                                              {
                                                                                  Id = dt.Id,
                                                                                  DocumentName = dt.DocumentName,
                                                                                  CreatedAt = dt.CreatedAt,
                                                                                  Content = null
                                                                              })
                                                                              .ToListAsync();
            return documentTemplatesPreview;
        }
    }
}
