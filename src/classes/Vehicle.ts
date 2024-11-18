// Import the Driveable interface, which defines the contract for driveable vehicles
import Driveable from '../interfaces/Driveable.js';

// Vehicle class that implements the Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  vin: string; // Vehicle Identification Number
  color: string; // Color of the vehicle
  make: string; // Manufacturer of the vehicle
  model: string; // Model of the vehicle
  year: number; // Manufacture year of the vehicle
  started: boolean; // Indicates if the vehicle is started
  currentSpeed: number; // Current speed of the vehicle

  // Constructor for initializing the Vehicle class properties
  constructor(vin: string, color: string, make: string, model: string, year: number) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.started = false; // Vehicle is initially not started
    this.currentSpeed = 0; // Initial speed is set to 0
  }

  // Method to print all details of the vehicle to the console
  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
  }

  // Method to start the vehicle, setting the started flag to true
  start(): void {
    this.started = true;
    console.log('Vehicle started');
  }

  // Method to accelerate the vehicle by a given speed change, only if started
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(`Vehicle accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to decelerate the vehicle by a given speed change, only if started
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      console.log(`Vehicle decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to stop the vehicle, resetting speed to 0 and setting started to false
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log('Vehicle stopped');
  }

  // Method to turn the vehicle in a specified direction, only if started
  turn(direction: string): void {
    if (this.started) {
      console.log(`Vehicle turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to reverse the vehicle, only if started
  reverse(): void {
    if (this.started) {
      console.log('Vehicle reversed');
    } else {
      console.log('Start the vehicle first');
    }
  }
}

// Export the Vehicle class for use in other modules
export default Vehicle;