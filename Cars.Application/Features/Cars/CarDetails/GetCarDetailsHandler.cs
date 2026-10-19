
using Cars.Application.Abstractions;
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.CarDetails;

public class GetCarDetailsHandler : IRequestHandler<GetCarDetailsQuery, Result<GetCarDetailsResponse>>
{
    
    private readonly ICarsRepository _carsRepository;                                                                                                                      
    
    public GetCarDetailsHandler(ICarsRepository carsRepository)
    {
        _carsRepository = carsRepository;
    }
    
    public async Task<Result<GetCarDetailsResponse>> Handle(GetCarDetailsQuery request, CancellationToken cancellationToken)
    {
        var car = await _carsRepository.GetCarByIdAsync(request.id, cancellationToken);

        if (car == null)
        {
            return Result<GetCarDetailsResponse>.Failure($"Car with ID {request.id} not found.");
        }
        
        var carDetails = new GetCarDetailsResponse(car.Id.ToString(), car.Brand, car.Model, car.DoorsNumber, 
            car.LuggageCapacity, car.EngineCapacity, car.FuelType, car.ProductionDate, car.AvarageFuelConsumption);
        
        return Result<GetCarDetailsResponse>.Success(carDetails);
    }
}