// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // Call to the parent class constructor to initialize common properties
    super(vin, color, make, model, year);

    // Ensure weight is a positive number; throw an error if not
    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    // Ensure top speed is a positive number; throw an error if not
    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    // Check if the car has exactly 4 wheels; if not, initialize with 4 default wheels
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  // Override the printDetails method to include Car-specific details
  override printDetails(): void {
    // Call the base Vehicle class printDetails method
    super.printDetails();

    // Print weight and top speed details specific to the Car class
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    // Print each wheel's details, including diameter and tire brand
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}

// Export the Car class as the default export for use in other modules
export default Car;

