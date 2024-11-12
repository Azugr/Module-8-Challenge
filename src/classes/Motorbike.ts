// Removed redundant declarations in Motorbike
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

class Motorbike extends Vehicle {
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
    super(vin, color, make, model, year); // Initialize properties from Vehicle

    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    // Ensure wheels array contains exactly two wheels; if not, default to two new Wheel instances
    this.wheels = wheels.length === 2 ? wheels : [new Wheel(), new Wheel()];
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails(): void {
    super.printDetails(); // Call Vehicle's printDetails for common properties
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Number of Wheels: ${this.wheels.length}`);
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}
export default Motorbike;
