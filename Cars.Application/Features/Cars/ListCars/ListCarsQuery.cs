
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.ListCars;

public record ListCarsQuery() : IRequest<Result<ListCarsResponse>>;