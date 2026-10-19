
using Cars.Application.Abstractions;
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.RemoveCar;

public class RemoveCarHandler : IRequestHandler<RemoveCarCommand, Result<RemoveCarResponse>>
{
    private readonly ICarsRepository _carsRepository;
    
    public RemoveCarHandler(ICarsRepository carsRepository)
    {
        _carsRepository = carsRepository;
    }
    
    public async Task<Result<RemoveCarResponse>> Handle(RemoveCarCommand request, CancellationToken cancellationToken)
    {
        var result = await _carsRepository.DeleteCarAsync(request.id, cancellationToken);
        if (result is null)
        {
            return Result<RemoveCarResponse>.Success(new RemoveCarResponse(false));
        }
        return Result<RemoveCarResponse>.Success(new RemoveCarResponse(true));
    }
}