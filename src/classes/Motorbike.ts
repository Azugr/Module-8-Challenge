// Importing base Vehicle class and Wheel class for motorbike properties
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Motorbike class that extends the Vehicle class
class Motorbike extends Vehicle {
  weight: number; // Motorbike's weight
  topSpeed: number; // Motorbike's top speed
  wheels: Wheel[]; // Array of Wheel instances for the motorbike

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
    // Call to the Vehicle superclass constructor to initialize inherited properties
    super(vin, color, make, model, year);

    // Validate weight to ensure it is a positive value
    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    // Validate top speed to ensure it is a positive value
    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    // Validate that wheels array has exactly two wheels; if not, throw an error
    if (wheels.length !== 2) {
      throw new Error('A motorbike must have exactly two wheels.');
    }
    this.wheels = wheels;
  }

  // Method to perform a wheelie action specific to Motorbike
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method to include Motorbike-specific details
  override printDetails(): void {
    super.printDetails(); // Call the base Vehicle's printDetails method for common properties
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Number of Wheels: ${this.wheels.length}`);

    // Log details of each wheel, including diameter and tire brand
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}

export default Motorbike;
