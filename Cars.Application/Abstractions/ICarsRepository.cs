
using Cars.Domain.Entities;

namespace Cars.Application.Abstractions;

public interface ICarsRepository
{
    public Task<List<Car>> GetAllCarsAsync(CancellationToken cancellationToken);
    
    public Task<Car?> GetCarByIdAsync(Guid id, CancellationToken cancellationToken);
    
    public Task<Car?> AddCarAsync(Car car, CancellationToken cancellationToken);
    
    public Task<Car?> UpdateCarAsync(Car car, CancellationToken cancellationToken);
    
    public Task<Car?> DeleteCarAsync(Guid id, CancellationToken cancellationToken);
}