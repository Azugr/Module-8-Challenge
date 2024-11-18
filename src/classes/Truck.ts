// Import necessary classes and interfaces
import Vehicle from './Vehicle.js';
import type AbleToTow from '../interfaces/AbleToTow.js';
import Wheel from './Wheel.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';

// Truck class extends Vehicle and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  weight: number; // Truck's weight
  topSpeed: number; // Truck's top speed
  towingCapacity: number; // Maximum weight the truck can tow
  wheels: Wheel[]; // Array of Wheel instances for the truck

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number,
    wheels: Wheel[]
  ) {
    // Call the parent Vehicle constructor to initialize common properties
    super(vin, color, make, model, year);

    // Ensure weight is a positive value; throw an error if not
    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    // Ensure top speed is a positive value; throw an error if not
    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    // Ensure towing capacity is a positive value; throw an error if not
    if (towingCapacity <= 3000) {
      throw new Error('Towing capacity must be a positive value.');
    }
    this.towingCapacity = towingCapacity;

    // Ensure the truck has exactly 4 wheels; if not, initialize with 4 default wheels
    if (wheels.length !== 4) {
      console.warn('Truck must have 4 wheels. Defaulting to 4 new wheels.');
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

// Method to implement towing functionality from the AbleToTow interface
tow(vehicle: Car | Motorbike | Truck): void {
  if (vehicle.weight <= this.towingCapacity) {
    console.log(`${this.make} ${this.model} is towing ${vehicle.make} ${vehicle.model}!`);
  } else {
    console.log(`${vehicle.make} ${vehicle.model} is too heavy to tow.`);
  }
}


  // Override the printDetails method to include Truck-specific details
  override printDetails(): void {
    super.printDetails(); // Call Vehicle's printDetails for common properties
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    
    // Log details of each wheel, including diameter and tire brand
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}

export default Truck;
