
using Cars.Application.Abstractions;
using Cars.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure.Repositories;

public class CarsRepository : ICarsRepository
{
    private readonly DataContext _context;
    
    public CarsRepository(DataContext context)
    {
        _context = context;
    }
    
    
    
    public async Task<List<Car>> GetAllCarsAsync(CancellationToken cancellationToken)
    {
        var cars = await _context.Cars.ToListAsync(cancellationToken);
        return cars;
    }

    public async Task<Car?> GetCarByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var car = await _context.Cars.FindAsync([id], cancellationToken);
        return car;
    }

    public async Task<Car?> AddCarAsync(Car car, CancellationToken cancellationToken)
    {
        try
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync(cancellationToken);
            return car;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<Car?> UpdateCarAsync(Car car, CancellationToken cancellationToken)
    {
        try
        {
            _context.Cars.Update(car);
            await _context.SaveChangesAsync(cancellationToken);
            return car;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<Car?> DeleteCarAsync(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var car = await _context.Cars.FindAsync(new object[] { id }, cancellationToken);
            if (car == null)
            {
                throw new KeyNotFoundException($"Car with ID {id} not found.");
            }
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync(cancellationToken);
            return car;
        }
        catch (Exception e)
        {
            return null;
        }
    }
}