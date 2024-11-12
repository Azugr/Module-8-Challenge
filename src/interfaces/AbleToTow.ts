// Import the classes
import Truck from "../classes/Truck.js";
import Motorbike from "../classes/Motorbike.js";
import Car from "../classes/Car.js";

// Define the interface
interface AbleToTow {
    // declare the properties
    towingCapacity?: number;

    // Tow method takes a truck or a motorbike or a car as an argument
    tow(vehicle: Truck | Motorbike | Car): void;
}

// Export the interface
export default AbleToTow;
