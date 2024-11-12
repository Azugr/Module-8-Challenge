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
    super(vin, color, make, model, year);

    if (weight <= 0) {
      throw new Error('Weight must be a positive value.');
    }
    this.weight = weight;

    if (topSpeed <= 0) {
      throw new Error('Top speed must be a positive value.');
    }
    this.topSpeed = topSpeed;

    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter} inch with a ${wheel.tireBrand} tire`);
    });
  }
}

export default Car;
