
using Cars.Application.Abstractions;
using Cars.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cars.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Missing database connection string.");

        services.AddDbContext<DataContext>(options =>
            options.UseSqlite(connectionString));


        services.AddScoped<ICarsRepository, CarsRepository>();

        var seed = new Seed();
        seed.SeedData(services.BuildServiceProvider().GetRequiredService<DataContext>()).GetAwaiter().GetResult();
        
        return services;
    }
}