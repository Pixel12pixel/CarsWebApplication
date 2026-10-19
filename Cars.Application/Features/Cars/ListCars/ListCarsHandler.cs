
using Cars.Application.Abstractions;
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.ListCars;

public class ListCarsHandler : IRequestHandler<ListCarsQuery, Result<ListCarsResponse>>
{
    private readonly ICarsRepository _carsRepository;
    
    public ListCarsHandler(ICarsRepository carsRepository)
    {
        _carsRepository = carsRepository;
    }
    
    public async Task<Result<ListCarsResponse>> Handle(ListCarsQuery request, CancellationToken cancellationToken)
    {
        var cars = await _carsRepository.GetAllCarsAsync(cancellationToken);
        var carList = cars.Select(c => (c.Id.ToString(), c.Model.ToString()).ToString()).ToList();
        var listCarsResponse = new ListCarsResponse(carList);
        return Result<ListCarsResponse>.Success(listCarsResponse);
    }
}