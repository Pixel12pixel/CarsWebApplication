
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.RemoveCar;

public record RemoveCarCommand(Guid id) : IRequest<Result<RemoveCarResponse>>;