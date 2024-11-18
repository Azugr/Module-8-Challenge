import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import type AbleToTow from "../interfaces/AbleToTow.js";
import type Driveable from "../interfaces/Driveable.js";

// Models for each vehicle type
const carModels = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
  Ford: ["Mustang", "Explorer", "F-150", "Bronco", "Escape"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  BMW: ["3 Series", "5 Series", "X5", "Z4", "i8"],
} as const;

const truckModels = {
  Ford: ["F-150", "Ranger", "Super Duty", "Maverick"],
  Chevrolet: ["Silverado", "Colorado", "Avalanche", "Kodiak"],
  Ram: ["1500", "2500", "3500", "ProMaster"],
  Toyota: ["Tundra", "Tacoma", "Hilux"],
  GMC: ["Sierra", "Canyon", "TopKick"],
} as const;

const motorbikeModels = {
  HarleyDavidson: ["Sportster", "Softail", "Touring", "Street Glide"],
  Yamaha: ["R1", "R6", "MT-09", "YZF"],
  Honda: ["CBR600RR", "CB500F", "Africa Twin", "Shadow Phantom"],
  Ducati: ["Panigale V4", "Multistrada", "Monster", "Diavel"],
  BMW: ["R1250GS", "S1000RR", "F900R", "K1600GTL"],
} as const;

// The CLI class to manage vehicle creation, selection, and interactions
class Cli {
  vehicles: (Car | Truck | Motorbike)[]; // Array of vehicles (Car, Truck, or Motorbike)
  selectedVehicleVin: string | undefined; // VIN of the selected vehicle for actions
  exit: boolean = false; // Flag to determine when to exit the CLI

  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  // Generates a unique VIN for each vehicle
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Start the CLI with options for creating or selecting vehicles
  async startCli(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "createOrSelect",
        message: "Would you like to create a new vehicle or select an existing vehicle?",
        choices: ["Create a new vehicle", "Select an existing vehicle"],
      },
    ]);

    if (answers.createOrSelect === "Create a new vehicle") {
      this.createVehicle();
    } else if (this.vehicles.length > 0) {
      this.chooseVehicle();
    } else {
      console.log("No vehicles available. Please create a new vehicle first.");
      this.startCli(); // Restart the CLI menu
    }
  }

  // Method to select a vehicle and perform actions on it
  async chooseVehicle(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "selectedVehicleVin",
        message: "Select a vehicle to perform an action on",
        choices: this.vehicles.map((vehicle) => ({
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle.vin,
        })),
      },
    ]);

    this.selectedVehicleVin = answers.selectedVehicleVin;
    this.performActions();
  }

  // Method to create a new vehicle
  async createVehicle(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "vehicleType",
        message: "Select a vehicle type",
        choices: ["Car", "Truck", "Motorbike"],
      },
    ]);

    if (answers.vehicleType === "Car") {
      await this.createCar();
    } else if (answers.vehicleType === "Truck") {
      await this.createTruck();
    } else if (answers.vehicleType === "Motorbike") {
      await this.createMotorbike();
    }
  }

  // Method to create a Car with prompts and validation
  async createCar(): Promise<void> {
    const answers = await inquirer.prompt<{
      make: keyof typeof carModels;
    }>([
      {
        type: "list",
        name: "make",
        message: "Select the car make:",
        choices: Object.keys(carModels),
      },
    ]);

    const selectedMakeModels = carModels[answers.make];

    const { model, year, color, weight, topSpeed, wheels } = await inquirer.prompt([
      {
        type: "list",
        name: "model",
        message: `Select a model for ${answers.make}:`,
        choices: selectedMakeModels || [],
      },
      {
        type: "input",
        name: "year",
        message: "Enter the car year:",
        validate: (input) => {
          const parsed = parseInt(input, 10);
          return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear()
            ? true
            : "Please enter a valid year.";
        },
      },
      {
        type: "list",
        name: "color",
        message: "Select the car color:",
        choices: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Purple", "Orange", "Pink"],
      },
      {
        type: "list",
        name: "weight",
        message: "Select the car weight:",
        choices: ["1000 kg", "1500 kg", "2000 kg", "2500 kg", "3000 kg"],
      },
      {
        type: "list",
        name: "topSpeed",
        message: "Select the car top speed:",
        choices: ["120 km/h", "150 km/h", "180 km/h", "200 km/h", "220 km/h"],
      },
      {
        type: "list",
        name: "wheels",
        message: "Select the wheel size and brand for the car:",
        choices: ["15 inch - Generic", "16 inch - Goodyear", "17 inch - Bridgestone"],
      },
    ]);

    const newCar = new Car(
      Cli.generateVin(),
      color,
      answers.make,
      model,
      parseInt(year, 10),
      parseFloat(weight.split(" ")[0]),
      parseFloat(topSpeed.split(" ")[0]),
      wheels
    );

    this.vehicles.push(newCar);
    console.log("Car created successfully!");
    this.startCli();
  }

  // Method to create a Truck with prompts and validation
  async createTruck(): Promise<void> {
    const answers = await inquirer.prompt<{
      make: keyof typeof truckModels;
    }>([
      {
        type: "list",
        name: "make",
        message: "Select the truck make:",
        choices: Object.keys(truckModels),
      },
    ]);

    const selectedMakeModels = truckModels[answers.make];

    const { model, year, color, weight, topSpeed, towingCapacity, wheels } = await inquirer.prompt([
      {
        type: "list",
        name: "model",
        message: `Select a model for ${answers.make}:`,
        choices: selectedMakeModels || [],
      },
      {
        type: "input",
        name: "year",
        message: "Enter the truck year:",
        validate: (input) => {
          const parsed = parseInt(input, 10);
          return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear()
            ? true
            : "Please enter a valid year.";
        },
      },
      {
        type: "list",
        name: "color",
        message: "Select the truck color:",
        choices: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Purple", "Orange", "Pink"],
      },
      {
        type: "list",
        name: "weight",
        message: "Select the truck weight:",
        choices: ["3000 kg", "4000 kg", "5000 kg", "6000 kg", "7000 kg"],
      },
      {
        type: "list",
        name: "topSpeed",
        message: "Select the truck top speed:",
        choices: ["100 km/h", "120 km/h", "150 km/h", "180 km/h"],
      },
      {
        type: "input",
        name: "towingCapacity",
        message: "Enter the truck towing capacity (in kg):",
        validate: (input) => {
          const parsed = parseFloat(input);
          return !isNaN(parsed) && parsed >= 150 && parsed <= 1000
            ? true
            : "Please enter a valid towing capacity.";
        },
      },
      {
        type: "list",
        name: "wheels",
        message: "Select the wheel size and brand for the truck:",
        choices: ["18 inch - Goodyear", "20 inch - Michelin", "22 inch - Bridgestone"],
      },
    ]);

    const newTruck = new Truck(
      Cli.generateVin(),
      color,
      answers.make,
      model,
      parseInt(year, 10),
      parseFloat(weight.split(" ")[0]),
      parseFloat(topSpeed.split(" ")[0]),
      parseFloat(towingCapacity),
      wheels
    );

    this.vehicles.push(newTruck);
    console.log("Truck created successfully!");
    this.startCli();
  }

  // Method to create a Motorbike with prompts and validation
  async createMotorbike(): Promise<void> {
    const answers = await inquirer.prompt<{
      make: keyof typeof motorbikeModels;
    }>([
      {
        type: "list",
        name: "make",
        message: "Select the motorbike make:",
        choices: Object.keys(motorbikeModels),
      },
    ]);

    const selectedMakeModels = motorbikeModels[answers.make];

    const { model, year, color, weight, topSpeed } = await inquirer.prompt([
      {
        type: "list",
        name: "model",
        message: `Select a model for ${answers.make}:`,
        choices: selectedMakeModels || [],
      },
      {
        type: "input",
        name: "year",
        message: "Enter the motorbike year:",
        validate: (input) => {
          const parsed = parseInt(input, 10);
          return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear()
            ? true
            : "Please enter a valid year.";
        },
      },
      {
        type: "list",
        name: "color",
        message: "Select the motorbike color:",
        choices: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Purple", "Orange", "Pink"],
      },
      {
        type: "list",
        name: "weight",
        message: "Select the motorbike weight:",
        choices: ["150 kg", "200 kg", "250 kg", "300 kg", "350 kg"],
      },
      {
        type: "list",
        name: "topSpeed",
        message: "Select the motorbike top speed:",
        choices: ["80 km/h", "100 km/h", "120 km/h", "150 km/h"],
      },
    ]);

    const { frontWheelDiameter, frontWheelBrand, rearWheelDiameter, rearWheelBrand } = await inquirer.prompt([
      {
        type: "list",
        name: "frontWheelDiameter",
        message: "Select the front wheel diameter (inches):",
        choices: ["16 inch", "17 inch", "18 inch"],
      },
      {
        type: "list",
        name: "frontWheelBrand",
        message: "Select the front wheel tire brand:",
        choices: ["Pirelli", "Michelin", "Dunlop"],
      },
      {
        type: "list",
        name: "rearWheelDiameter",
        message: "Select the rear wheel diameter (inches):",
        choices: ["16 inch", "17 inch", "18 inch"],
      },
      {
        type: "list",
        name: "rearWheelBrand",
        message: "Select the rear wheel tire brand:",
        choices: ["Pirelli", "Michelin", "Dunlop"],
      },
    ]);
     
    const newMotorbike = new Motorbike(
      Cli.generateVin(),
      color,
      answers.make,
      model,
      parseInt(year, 10),
      parseFloat(weight.split(" ")[0]),
      parseFloat(topSpeed.split(" ")[0]),
      [
        new Wheel(parseInt(frontWheelDiameter.split(" ")[0], 10), frontWheelBrand),
        new Wheel(parseInt(rearWheelDiameter.split(" ")[0], 10), rearWheelBrand),
      ]
    );

    this.vehicles.push(newMotorbike);
    console.log("Motorbike created successfully!");
    this.startCli();
  }

  // Method to perform actions on the selected vehicle
  async performActions(): Promise<void> {
    const vehicle = this.getSelectedVehicle();
    if (!vehicle) {
      console.log("No vehicle selected.");
      return;
    }

    // Define available actions based on the vehicle type
    const actions = [
      "Start",
      "Accelerate",
      "Decelerate",
      "Stop",
      "Turn",
      "Reverse",
      ...(vehicle instanceof Motorbike ? ["Wheelie"] : []),
      ...(vehicle instanceof Truck ? ["Tow"] : []),
      "Exit",
    ];

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action to perform",
        choices: actions,
      },
    ]);

    switch (answers.action) {
      case "Start":
        if (this.isDriveable(vehicle)) vehicle.start();
        break;
      case "Accelerate":
        if (this.isDriveable(vehicle)) vehicle.accelerate(5);
        break;
      case "Decelerate":
        if (this.isDriveable(vehicle)) vehicle.decelerate(5);
        break;
      case "Stop":
        if (this.isDriveable(vehicle)) vehicle.stop();
        break;
      case "Turn":
        if (this.isDriveable(vehicle)) vehicle.turn("right");
        break;
      case "Reverse":
        if (this.isDriveable(vehicle)) vehicle.reverse();
        break;
      case "Wheelie":
        if (vehicle instanceof Motorbike) vehicle.wheelie();
        break;
      case "Tow":
        if (vehicle instanceof Truck) await this.towVehicle(vehicle);
        break;
      case "Exit":
        console.log("Exiting the CLI...");
        process.exit(0);
      default:
        console.log("Invalid action.");
    }

    // Repeat actions unless the user exits
    if (answers.action !== "Exit") {
      this.performActions();
    }
  }

  // Helper method to tow a vehicle
  async towVehicle(truck: Truck): Promise<void> {
    if (this.vehicles.length <= 1) {
      console.log("No other vehicles available to tow. Please create another vehicle.");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "vehicleToTow",
        message: "Select a vehicle to tow:",
        choices: this.vehicles
          .filter((v) => v.vin !== truck.vin)
          .map((v) => ({
            name: `${v.make} ${v.model} (${v.weight} kg)`,
            value: v.vin,
          })),
      },
    ]);

    const vehicleToTow = this.vehicles.find((v) => v.vin === answers.vehicleToTow);

    if (vehicleToTow) {
      if (vehicleToTow.weight <= truck.towingCapacity) {
        console.log(
          `${truck.make} ${truck.model} is towing ${vehicleToTow.make} ${vehicleToTow.model}!`
        );
      } else {
        console.log(`${vehicleToTow.make} ${vehicleToTow.model} is too heavy to tow.`);
      }
    } else {
      console.log("Selected vehicle not found.");
    }

    this.performActions();
  }

  // Helper method to get the selected vehicle by VIN
  private getSelectedVehicle() {
    return this.vehicles.find((vehicle) => vehicle.vin === this.selectedVehicleVin);
  }

  // Type guards to ensure the correct actions are called
  private isDriveable(vehicle: any): vehicle is Driveable {
    return (vehicle as Driveable).start !== undefined;
  }
}

export default Cli;
