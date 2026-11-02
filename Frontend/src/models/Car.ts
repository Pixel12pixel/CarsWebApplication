export type CarListItem = string;

export interface Car {
    id: string;
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: string;
    productionDate: string;
    averageFuelConsumption: number;
}

export type CarRequest = Omit<Car, "id">;