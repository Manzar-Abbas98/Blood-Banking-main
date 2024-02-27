using back.Data;
using back.Helpers;
using back.Interfaces;
using back.Services;
using Microsoft.EntityFrameworkCore;

namespace back.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt => 
              {
               opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
              });

           services.AddCors();

           services.AddScoped<ITokenService, TokenService>();
           services.AddScoped<IUserRepository, UserRepository>();
           services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
           services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
           services.AddScoped<IPhotoService, PhotoService>();
           services.AddScoped<LogUserActivity>();
           services.AddScoped<IBloodRequestRepository, BloodRequestRepository>();

           return services;
        }
    }
}