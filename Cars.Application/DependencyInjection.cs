
using Cars.Application.Abstractions.Messaging;
using Cars.Application.Features.Cars.AddCar;
using Cars.Application.Features.Cars.CarDetails;
using Cars.Application.Features.Cars.ListCars;
using Cars.Application.Features.Cars.RemoveCar;
using Cars.Application.Features.Cars.UpdateCar;
using Cars.Contracts.Cars;
using Cars.Shared.Common;
using Microsoft.Extensions.DependencyInjection;

namespace Cars.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IMediator, Mediator>();
        
        
        services.AddScoped<IRequestHandler<ListCarsQuery, Result<ListCarsResponse>>, ListCarsHandler>();
        services.AddScoped<IRequestHandler<GetCarDetailsQuery, Result<GetCarDetailsResponse>>, GetCarDetailsHandler>();
        services.AddScoped<IRequestHandler<AddCarCommand, Result<AddCarResponse>>, AddCarHandler>();
        services.AddScoped<IRequestHandler<UpdateCarCommand, Result<UpdateCarResponse>>, UpdateCarHandler>();
        services.AddScoped<IRequestHandler<RemoveCarCommand, Result<RemoveCarResponse>>, RemoveCarHandler>();

        return services;
    }
}