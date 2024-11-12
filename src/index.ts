// Import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Create an array to store instances of various vehicles
const vehicles = [];

// Create a new Truck instance with a unique VIN, custom attributes, and default wheels
const truck1 = new Truck(
  Cli.generateVin(),
  "red",                 // Color of the truck
  "Ford",                // Make of the truck
  "F-150",               // Model of the truck
  2021,                  // Year of the truck
  5000,                  // Weight of the truck in lbs
  120,                   // Top speed in mph
  10000,                 // Towing capacity in lbs
  [                      // Wheels for the truck
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear"),
    new Wheel(18, "Goodyear")
  ]
);

// Create a new Car instance with a unique VIN, custom attributes, and default wheels
const car1 = new Car(
  Cli.generateVin(),
  "blue",                // Color of the car
  "Toyota",              // Make of the car
  "Camry",               // Model of the car
  2021,                  // Year of the car
  3000,                  // Weight of the car in lbs
  130,                   // Top speed in mph
  [                      // Wheels for the car
    new Wheel(15, "Generic"),
    new Wheel(15, "Generic"),
    new Wheel(15, "Generic"),
    new Wheel(15, "Generic")
  ]
);

// Create a new Motorbike instance with a unique VIN, custom attributes, and custom wheels
const motorbike1Wheels = [
  new Wheel(17, "Michelin"),
  new Wheel(17, "Michelin")
];
const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",               // Color of the motorbike
  "Harley Davidson",     // Make of the motorbike
  "Sportster",           // Model of the motorbike
  2021,                  // Year of the motorbike
  500,                   // Weight of the motorbike in lbs
  125,                   // Top speed in mph
  motorbike1Wheels       // Wheels for the motorbike
);

// Add created vehicles to the vehicles array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Initialize the CLI with the array of vehicles
const cli = new Cli(vehicles);

// Start the CLI, allowing the user to interact with the vehicle options
cli.startCli();
