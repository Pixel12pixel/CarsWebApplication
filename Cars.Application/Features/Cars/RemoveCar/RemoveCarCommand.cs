

using Cars.Contracts.Cars;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Cars.RemoveCar;

public record RemoveCarCommand(Guid id) : IRequest<Result<RemoveCarResponse>>;