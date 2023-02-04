using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config) 
            {
                services.AddDbContext<DataContext>(opt => 
                {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });
                services.AddCors();
                services.AddScoped<ITokenService, TokenService>();
                services.AddScoped<IUserRepository, UserRepository>();
                services.AddScoped<IBudgetRepository, BudgetRepository>();
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

                return services;
            }
    }
}