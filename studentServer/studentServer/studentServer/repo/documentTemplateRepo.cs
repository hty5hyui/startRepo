using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;
using studentServer.Service;
using System.Linq;

namespace studentServer.repo
{
    public class documentTemplateRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 30;

        internal async Task UploadDocumentTemplateAsync(DocumentTemplate documentTemplate)
        {
            await _dbContext.DocumentTemplate.AddAsync(documentTemplate);
            await _dbContext.SaveChangesAsync();
        }

        internal async Task<DocumentTemplate> GetDocumentTemplateByIdAsync(int id)
        {
            return await _dbContext.DocumentTemplate.FindAsync(id);
        }

        internal async Task<DocumentTemplatePreviewPageData> GetAllPreviewDocumentTemplateAsync(int page)
        {
            DocumentTemplatePreviewPageData data = new DocumentTemplatePreviewPageData();

            data.documentTemplatePreview = await _dbContext.DocumentTemplate
                                                           .OrderByDescending(i => i.Id)
                                                           .Skip((page - 1) * pageSize)
                                                           .Take(pageSize)
                                                           .Select(dt => new DocumentTemplatePreview
                                                           {
                                                               Id = dt.Id,
                                                               DocumentName = dt.DocumentName,
                                                               CreatedAt = dt.CreatedAt,
                                                           })
                                                           .ToListAsync();
            int rowCount = await _dbContext.DocumentTemplate.CountAsync();
            data.pageCount = (int)Math.Ceiling((double)rowCount / pageSize);

            return data;
        }

        internal async Task<DocumentTemplatePreviewPageData> GetPreviewDocumentTemplateSearchAsync(PageSearchEntity pageQuery)
        {
            DocumentTemplatePreviewPageData data = new DocumentTemplatePreviewPageData();

            IQueryable<DocumentTemplate> baseQuery = _dbContext.DocumentTemplate;
            IQueryable<DocumentTemplate> filteredQuery = queryBuilder.ApplyFilters(baseQuery, pageQuery.searchFilter!);

            data.documentTemplatePreview = await filteredQuery.OrderByDescending(i => i.Id)
                                                              .Skip((pageQuery.page - 1) * pageSize)
                                                              .Take(pageSize)
                                                              .Select(dt => new DocumentTemplatePreview
                                                              {
                                                                  Id = dt.Id,
                                                                  DocumentName = dt.DocumentName,
                                                                  CreatedAt = dt.CreatedAt,
                                                              })
                                                              .ToListAsync();

            return data;
        }

        internal async Task DeleteDocumentTemplateAsync(DocumentTemplate template)
        {
            _dbContext.Remove(template);
            await _dbContext.SaveChangesAsync();
        }

        internal async Task<DocumentTemplatePreviewPageData> SearchPreviewDocumentTemplateAsync(string str)
        {
            DocumentTemplatePreviewPageData data = new DocumentTemplatePreviewPageData();
            data.documentTemplatePreview = await _dbContext.DocumentTemplate.OrderByDescending(i => i.Id)
                                                                            .Select(dt => new DocumentTemplatePreview
                                                                            {
                                                                                Id = dt.Id,
                                                                                DocumentName = dt.DocumentName,
                                                                                CreatedAt = dt.CreatedAt,
                                                                            })
                                                                            .Where(t => EF.Functions.ILike(t.DocumentName, $"%{str}%"))
                                                                            .ToListAsync();
            return data;
        }
    }
}
