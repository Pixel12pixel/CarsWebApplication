
namespace Cars.Domain.Entities;

public class Car
{
    public Guid Id { get; private set; }
    
    public string Brand { get; private set; }
    
    public string Model { get; private set; }
    
    public int DoorsNumber { get; private set; }
    
    public int LuggageCapacity { get; private set; }
    
    public int EngineCapacity { get; private set; }
    
    public string FuelType { get; private set; }
    
    public DateOnly ProductionDate { get; private set; }
    
    public int AvarageFuelConsumption { get; private set; }
    
    public Car(Guid id, string brand, string model, int doorsNumber, int luggageCapacity, int engineCapacity, string fuelType, DateOnly productionDate, int averageFuelConsumption)
    {
        Id = id;
        Brand = brand;
        Model = model;
        DoorsNumber = doorsNumber;
        LuggageCapacity = luggageCapacity;
        EngineCapacity = engineCapacity;
        FuelType = fuelType;
        ProductionDate = productionDate;
        AvarageFuelConsumption = averageFuelConsumption;
    }
    
    public void Update(string brand, string model, int doorsNumber, int luggageCapacity, int engineCapacity, string fuelType, DateOnly productionDate, int averageFuelConsumption)
    {
        Brand = brand;
        Model = model;
        DoorsNumber = doorsNumber;
        LuggageCapacity = luggageCapacity;
        EngineCapacity = engineCapacity;
        FuelType = fuelType;
        ProductionDate = productionDate;
        AvarageFuelConsumption = averageFuelConsumption;
    }
    
    
    private Car() { } // For EF Core
    
}