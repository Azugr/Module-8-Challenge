// Import necessary classes and interfaces
import Vehicle from './Vehicle.js';
import type AbleToTow from '../interfaces/AbleToTow.js';
import Wheel from './Wheel.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';

class Truck extends Vehicle implements AbleToTow {
  weight: number;
  topSpeed: number;
  towingCapacity: number;
  wheels: Wheel[];

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
    super(vin, color, make, model, year);

    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    if (towingCapacity <= 0) {
      throw new Error('Towing capacity must be a positive value.');
    }
    this.towingCapacity = towingCapacity;

    // Ensuring the truck always has 4 wheels
    if (wheels.length !== 4) {
      console.warn('Truck must have 4 wheels. Defaulting to 4 new wheels.');
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from AbleToTow
  tow(vehicle: Vehicle): void {
    // Type checking to ensure vehicle is one of the towable types
    if (vehicle instanceof Truck || vehicle instanceof Car || vehicle instanceof Motorbike) {
      if (vehicle.weight <= this.towingCapacity) {
        console.log(`Truck is towing ${vehicle.make} ${vehicle.model}`);
      } else {
        console.log(`The ${vehicle.make} ${vehicle.model} is too heavy to tow.`);
      }
    } else {
      console.log('This type of vehicle cannot be towed.');
    }
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}

export default Truck;
