
using Cars.Application.Abstractions.Messaging;
using Cars.Application.Common.Behaviors;
using Cars.Application.Features.Cars.AddCar;
using Cars.Application.Features.Cars.CarDetails;
using Cars.Application.Features.Cars.ListCars;
using Cars.Application.Features.Cars.RemoveCar;
using Cars.Application.Features.Cars.UpdateCar;
using Cars.Contracts.Cars;
using Cars.Shared.Common;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Cars.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AddCarHandler).Assembly));
        
        services.AddValidatorsFromAssembly(typeof(UpdateCarCommandValidator).Assembly);
        
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        
        return services;
    }
}