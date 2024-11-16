// Definition of the Driveable interface, specifying a contract for driveable vehicles

interface Driveable {
  // Property to indicate if the vehicle is started
  started: boolean;

  // Property to store the vehicle's current speed
  currentSpeed: number;
  
  // Method to start the vehicle
  start(): void;

  // Method to increase the vehicle's speed by a specified amount
  accelerate(change: number): void;

  // Method to decrease the vehicle's speed by a specified amount
  decelerate(change: number): void;

  // Method to stop the vehicle, resetting its speed and started status
  stop(): void;

  // Method to turn the vehicle in a specified direction (e.g., "left" or "right")
  turn(direction: string): void;

  // Method to reverse the vehicle's movement
  reverse(): void;
}

// Export the Driveable interface for use in other modules
export default Driveable;
