
namespace Cars.Contracts.Cars;

public record AddCarRequest(string Brand, string Model, int DoorsNumber, int LuggageCapacity, 
    int EngineCapacity, string FuelType, DateOnly ProductionDate, int AverageFuelConsumption);