using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using studentServer.Controller;
using studentServer.repo;
using studentServer.repo.Data;
using studentServer.Service;
using studentServer.TempService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbStudentContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnectionStudent"));
});

//------------------------------------------------------------------------------
//-----------------------DI-----------------------------------------------------
builder.Services.AddScoped<studentRepo>();
builder.Services.AddScoped<studentsCRUD>();
builder.Services.AddScoped<studentController>();
builder.Services.AddScoped<companyRepo>();
builder.Services.AddScoped<companyCRUD>();
builder.Services.AddScoped<companyController>();
builder.Services.AddScoped<professionRepo>();
builder.Services.AddScoped<professionCRUD>();
builder.Services.AddScoped<professionController>();
//--------------
builder.Services.AddScoped<RandomDataSetInBase>();
builder.Services.AddScoped<testController>();
//--------------
//------------------------------------------------------------------------------


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
