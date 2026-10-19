
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.CarDetails;

public record GetCarDetailsQuery(Guid id) : IRequest<Result<GetCarDetailsResponse>>;