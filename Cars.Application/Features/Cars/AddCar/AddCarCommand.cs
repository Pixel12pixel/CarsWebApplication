
using Cars.Application.Abstractions.Messaging;
using Cars.Contracts.Cars;
using Cars.Shared.Common;

namespace Cars.Application.Features.Cars.AddCar;

public record AddCarCommand(string Brand, string Model, int DoorsNumber, int LuggageCapacity, int EngineCapacity, 
    string FuelType, DateOnly ProductionDate, int AverageFuelConsumption) : IRequest<Result<AddCarResponse>>;
