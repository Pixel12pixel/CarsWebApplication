

using Cars.Contracts.Cars;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Cars.CarDetails;

public record GetCarDetailsQuery(Guid id) : IRequest<Result<GetCarDetailsResponse>>;