
using FluentValidation;

namespace Cars.Application.Features.Cars.UpdateCar;

public class UpdateCarCommandValidator : AbstractValidator<UpdateCarCommand>
{
    public UpdateCarCommandValidator()
    {
        RuleFor(x => x.Brand).NotEmpty().WithMessage("Brand required").MaximumLength(50).WithMessage("Brand shouldn't be longer than 50 characters");
        
        RuleFor(x => x.Model).NotEmpty().WithMessage("Model required").MaximumLength(50).WithMessage("Model shouldn't be longer than 50 characters");
        
        RuleFor(x => x.DoorsNumber).InclusiveBetween(2, 5).WithMessage("Doors number should be between 2 and 5");
        
        RuleFor(x => x.LuggageCapacity).GreaterThan(0).WithMessage("Luggage capacity should be greater than 0");
        
        RuleFor(x => x.ProductionDate).LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now)).WithMessage("Production date should be in the past");
        
        RuleFor(x => x.EngineCapacity).GreaterThan(0).WithMessage("Engine capacity should be greater than 0");
    }
}