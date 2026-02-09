using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using studentServer.Controller;
using studentServer.Filters;
using studentServer.repo;
using studentServer.repo.Data;
using studentServer.Service.CRUD;
using studentServer.Service.FileOperation;

var builder = WebApplication.CreateBuilder(args);

// Добавление глобального фильтра обработки исключений
builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
});

// Добавление контекста БД
builder.Services.AddDbContext<AppDbStudentContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnectionStudent"));
});

//------------------------------------------------------------------------------
//-----------------------DI-----------------------------------------------------
builder.Services.AddScoped<studentRepo>();
builder.Services.AddScoped<studentsCRUD>();
builder.Services.AddScoped<StudentController>();

builder.Services.AddScoped<companyRepo>();
builder.Services.AddScoped<companyCRUD>();
builder.Services.AddScoped<companyController>();

builder.Services.AddScoped<professionRepo>();
builder.Services.AddScoped<professionCRUD>();
builder.Services.AddScoped<professionController>();

builder.Services.AddScoped<documentTemplateRepo>();
builder.Services.AddScoped<documentTemplateCRUD>();
builder.Services.AddScoped<documentController>();

builder.Services.AddScoped<OperationService>();
builder.Services.AddMemoryCache();
builder.Services.AddScoped<operationController>();

builder.Services.AddScoped<logRepo>();
builder.Services.AddScoped<LogService>();

builder.Services.AddScoped<GlobalExceptionFilter>();
//--------------
builder.Services.AddScoped<testController>();
//--------------
//------------------------------------------------------------------------------

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Конвертер который умеет читать и писать Enum в виде строк, а не только цифр.
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Student API",
        Version = "v1",
        Description = "API для управления студентами"
    });
});

// Добавление сервисов CORS дабы браузер не ругался (потом переделать под более точную настройку)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()   // Разрешить любой источник
                  .AllowAnyMethod()   // Разрешить любой HTTP-метод
                  .AllowAnyHeader();  // Разрешить любой заголовок
        });
});

var app = builder.Build();

//Применение миграций БД
//------------------------------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<AppDbStudentContext>();
        var logger = services.GetRequiredService<ILogger<Program>>();

        // Проверяем, существует ли БД
        if (!dbContext.Database.CanConnect())
        {
            logger.LogInformation("База данных не найдена. Создание...");

            // Проверяем, есть ли миграции
            var migrations = dbContext.Database.GetMigrations();
            if (migrations.Any())
            {
                // Если миграции есть - используем их
                dbContext.Database.Migrate();
                logger.LogInformation("База данных создана с помощью миграций");
            }
            else
            {
                // Если миграций нет - создаем БД напрямую (для разработки)
                dbContext.Database.EnsureCreated();
                logger.LogWarning("База данных создана через EnsureCreated(). Рекомендуется создать миграции.");
            }
        }
        else
        {
            // БД существует - применяем миграции, если есть
            var pendingMigrations = dbContext.Database.GetPendingMigrations();
            if (pendingMigrations.Any())
            {
                dbContext.Database.Migrate();
                logger.LogInformation("Применены миграции: {Count}", pendingMigrations.Count());
            }
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ошибка при инициализации базы данных");
    }
}
//------------------------------------------------------------------------------

//Для использования автоматического предоставления страниц
app.UseDefaultFiles();
app.UseStaticFiles();

//Используем CORS
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Student API v1");
        c.RoutePrefix = "swagger";
    });
}

app.MapControllers();

app.Run();
