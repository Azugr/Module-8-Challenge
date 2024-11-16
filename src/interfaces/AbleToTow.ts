// Import the classes representing different vehicle types
import Truck from "../classes/Truck.js";
import Motorbike from "../classes/Motorbike.js";
import Car from "../classes/Car.js";

// Define the AbleToTow interface, specifying a contract for towable vehicles
interface AbleToTow {
    // Optional property to specify the towing capacity of the vehicle
    towingCapacity?: number;

    // Method to tow another vehicle, accepting a Truck, Motorbike, or Car as an argument
    tow(vehicle: Truck | Motorbike | Car): void;
}

// Export the AbleToTow interface for use in other modules
export default AbleToTow;
