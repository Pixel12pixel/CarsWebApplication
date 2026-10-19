
namespace Cars.Contracts.Cars;

public record GetCarDetailsResponse(string Id, string Brand, string Model, int DoorsNumber, int LuggageCapacity, 
    int EngineCapacity, string FuelType, DateOnly ProductionDate, int AverageFuelConsumption);