
using Cars.Contracts.Cars;
using Cars.Shared.Common;
using MediatR;

namespace Cars.Application.Features.Cars.ListCars;

public record ListCarsQuery() : IRequest<Result<ListCarsResponse>>;