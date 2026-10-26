
using Cars.Application.Abstractions;
using Cars.Contracts.Cars;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Cars.UpdateCar;

public class UpdateCarHandler : IRequestHandler<UpdateCarCommand, Result<UpdateCarResponse>>
{
    private readonly ICarsRepository _carsRepository;
    
    public UpdateCarHandler(ICarsRepository carsRepository)
    {
        _carsRepository = carsRepository;
    }
    public async Task<Result<UpdateCarResponse>> Handle(UpdateCarCommand request, CancellationToken cancellationToken)
    {
        var car = await _carsRepository.GetCarByIdAsync(request.id, cancellationToken);
        if (car is null)
        {
            return Result<UpdateCarResponse>.Failure("Car not found");
        }
        
        car.Update(request.Brand, request.Model, request.DoorsNumber, request.LuggageCapacity, request.EngineCapacity, 
            request.FuelType, request.ProductionDate, request.AverageFuelConsumption);
        
        var updatedCar = await _carsRepository.UpdateCarAsync(car, cancellationToken);
        return Result<UpdateCarResponse>.Success(new UpdateCarResponse(updatedCar.Id.ToString(), updatedCar.Brand, 
            updatedCar.Model, updatedCar.DoorsNumber, updatedCar.LuggageCapacity, updatedCar.EngineCapacity, 
            updatedCar.FuelType, updatedCar.ProductionDate, updatedCar.AvarageFuelConsumption));
    }
}
