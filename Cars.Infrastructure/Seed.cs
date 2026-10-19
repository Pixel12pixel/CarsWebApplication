
using Cars.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure;

public class Seed
{
    public async Task SeedData(DataContext context)
    {
        if (await context.Cars.AnyAsync()) return;

        var cars = new List<Car>
        {
            new Car(
                Guid.NewGuid(),
                 "Volkswagen",
                "Golf",
                5,
                380,
                1395,
                "Petrol",
                DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-2)),
                5
            ),
            new Car(
                Guid.NewGuid(),
                "Renault",
                "Clio",
                4,
                320,
                1315,
                "Petrol",
                DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-10)),
                6
            ),
            new Car(
                Guid.NewGuid(),
                "Toyota",
                "Corolla",
                4,
                320,
                1618,
                "Petrol",
                DateOnly.FromDateTime(DateTime.UtcNow.AddMonths(-5)),
                6
            ),
        };

        await context.Cars.AddRangeAsync(cars);
        await context.SaveChangesAsync();
    }
    
}