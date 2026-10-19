
namespace Cars.Contracts.Cars;

public record UpdateCarResponse(string id, string Brand, string Model, int DoorsNumber, int LuggageCapacity, 
    int EngineCapacity, string FuelType, DateOnly ProductionDate, int AverageFuelConsumption);