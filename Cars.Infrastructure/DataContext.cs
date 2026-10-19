
using Cars.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Car> Cars => Set<Car>();
}