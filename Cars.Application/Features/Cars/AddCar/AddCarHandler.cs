
using Cars.Application.Abstractions;
using Cars.Contracts.Cars;
using Cars.Domain.Entities;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Cars.AddCar;

public class AddCarHandler : IRequestHandler<AddCarCommand, Result<AddCarResponse>>
{
    private readonly ICarsRepository _carsRepository;
    
    public AddCarHandler(ICarsRepository carsRepository)
    {
        _carsRepository = carsRepository;
    }
    
    public async Task<Result<AddCarResponse>> Handle(AddCarCommand request, CancellationToken cancellationToken)
    {
        var car = new Car(
            Guid.NewGuid(),
            request.Brand,
            request.Model,
            request.DoorsNumber,
            request.LuggageCapacity,
            request.EngineCapacity,
            request.FuelType,
            request.ProductionDate,
            request.AverageFuelConsumption
        );
        var addedCar = await _carsRepository.AddCarAsync(car, cancellationToken);
        if (addedCar == null)
        {
            return Result<AddCarResponse>.Failure("Failed to add car.");
        }
        return Result<AddCarResponse>.Success(new AddCarResponse(addedCar.Id.ToString()));
    }
}