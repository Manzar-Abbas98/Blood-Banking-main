using back.Data;
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

           return services;
        }
    }
}