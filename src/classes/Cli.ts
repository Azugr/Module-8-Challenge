import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import type AbleToTow from '../interfaces/AbleToTow.js';
import type Driveable from '../interfaces/Driveable.js';

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Start the CLI with options for creating or selecting vehicles
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "createOrSelect",
          message: "Would you like to create a new vehicle or select an existing vehicle?",
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.createOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else if (this.vehicles.length > 0) {
          this.chooseVehicle();
        } else {
          console.log("No vehicles available. Please create a new vehicle first.");
          this.startCli(); // Properly calling startCli
        }
      });
  }

  // Method to select a vehicle and perform actions on it
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to create a new vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

 // Method to create a Car with prompts and validation
 createCar(): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'wheels',
        message: 'Select the wheel size and brand for the car:',
        choices: ['15 inch - Generic', '16 inch - Goodyear', '17 inch - Bridgestone'],
      },
      {
        type: 'list',
        name: 'color',
        message: 'Select the car color:',
        choices: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Purple', 'Orange', 'Pink'],
      },
      {
        type: 'list',
        name: 'make',
        message: 'Select the car make:',
        choices: ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Hyundai'],
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter the car model:',
        validate: (input) => input.length > 3 ? true : 'Please enter a valid model name.',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter the car year:',
        validate: (input) => {
          const parsed = parseInt(input, 10);
          return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear() ? true : 'Please enter a valid year (greater than 1885 and not in the future).';
        },
      },
      {
        type: 'list',
        name: 'weight',
        message: 'Select the car weight:',
        choices: ['1000 kg', '1500 kg', '2000 kg', '2500 kg', '3000 kg'],
      },
      {
        type: 'list',
        name: 'topSpeed',
        message: 'Select the car top speed:',
        choices: ['120 km/h', '150 km/h', '180 km/h', '200 km/h', '220 km/h']
      },
      {
        type: 'list',
        name: 'wheels',
        message: 'Select the wheel size and brand for the car:',
        choices: ['15 inch - Generic', '16 inch - Goodyear', '17 inch - Bridgestone'],
      },
      {
        type: 'list',
        name: 'color',
        message: 'Select the car color:',
        choices: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Purple', 'Orange', 'Pink'],
      },
      { type: 'list', name: 'make', message: 'Select the $2 make:', choices: ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Hyundai'] },
      { type: 'input', name: 'model', message: 'Enter the $1 model:', validate: (input) => input.length > 0 ? true : 'Please enter a valid model name.' },
      {
        type: 'input',
        name: 'year',
        message: 'Enter the car year:',
        validate: (input) => {
          const parsed = parseInt(input, 10);
          return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear() ? true : 'Please enter a valid year (greater than 1885 and not in the future).';
        },
      },
    ])
    .then((answers) => {
      const newCar = new Car(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year, 10),
        parseFloat(answers.weight),
        parseFloat(answers.topSpeed),
        answers.wheels
      );
      this.vehicles.push(newCar);
      console.log('Car created successfully!');
      this.startCli();
    });
}

  // Method to create a Truck with prompts and validation
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'wheels',
          message: 'Select the wheel size and brand for the truck:',
          choices: ['18 inch - Goodyear', '20 inch - Michelin', '22 inch - Bridgestone'],
        },
        {
          type: 'list',
          name: 'color',
          message: 'Select the truck color:',
          choices: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Purple', 'Orange', 'Pink'],
        },
        { type: 'list', name: 'make', message: 'Select the truck make:', choices: ['Ford', 'Chevrolet', 'Ram', 'GMC', 'Toyota', 'Nissan', 'Mercedes-Benz', 'Volvo', 'Freightliner', 'Kenworth'] },
        { type: 'input',
          name: 'model',
          message: 'Enter the truck model:',
          validate: (input) => input.length >= 3 ? true : 'Please enter a model name with at least 3 characters.' },
        {
          type: 'input',
          name: 'year',
          message: 'Enter the truck year:',
          validate: (input) => {
            const parsed = parseInt(input, 10);
            return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear() ? true : 'Please enter a valid year (greater than 1885 and not in the future).';
          },
        },
        {
          type: 'list',
          name: 'weight',
          message: 'Select the truck weight:',
          choices: ['3000 kg', '4000 kg', '5000 kg', '6000 kg', '7000 kg'],
        },
        {
          type: 'list',
          name: 'topSpeed',
          message: 'Select the truck top speed:',
          choices: ['100 km/h', '120 km/h', '150 km/h', '180 km/h']
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter the truck towing capacity (between 150 kg and 1000 tons):',
          validate: (input) => {
            const parsed = parseFloat(input);
            return !isNaN(parsed) && parsed >= 150 && parsed <= 1000000 ? true : 'Please enter a valid towing capacity between 150 kg and 1000 tons.';
          }
        },
      ])
      .then((answers) => {
        const newTruck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseFloat(answers.weight),
          parseFloat(answers.topSpeed),
          parseFloat(answers.towingCapacity),
          answers.wheels,
        );
        this.vehicles.push(newTruck);
        console.log('Truck created successfully!');
        this.startCli();
      });
  }
  
  // Method to create a Motorbike with prompts and validation
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'wheels',
          message: 'Select the wheel size and brand for the motorbike:',
          choices: ['16 inch - Pirelli', '17 inch - Michelin', '18 inch - Dunlop'],
        },
        {
          type: 'list',
          name: 'color',
          message: 'Select the motorbike color:',
          choices: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Purple', 'Orange', 'Pink'],
        },
        { type: 'list', name: 'make', message: 'Select the motorbike make:', choices: ['Harley-Davidson', 'Yamaha', 'Honda', 'Ducati', 'BMW', 'Kawasaki', 'Suzuki', 'Triumph', 'Royal Enfield', 'KTM'] },
        { type: 'input',
          name: 'model',
          message: 'Enter the motorbike model:',
          validate: (input) => input.length >= 3 ? true : 'Please enter a model name with at least 3 characters.' },
        {
          type: 'input',
          name: 'year',
          message: 'Enter the motorbike year:',
          validate: (input) => {
            const parsed = parseInt(input, 10);
            return !isNaN(parsed) && parsed > 1885 && parsed <= new Date().getFullYear() ? true : 'Please enter a valid year (greater than 1885 and not in the future).';
          },
        },
        {
          type: 'list',
          name: 'weight',
          message: 'Select the motorbike weight:',
          choices: ['150 kg', '200 kg', '250 kg', '300 kg', '350 kg'],
        },
        {
          type: 'list',
          name: 'topSpeed',
          message: 'Select the motorbike top speed:',
          choices: ['80 km/h', '100 km/h', '120 km/h', '150 km/h']
        },
      ])
      .then((answers) => {
        const newMotorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseFloat(answers.weight),
          parseFloat(answers.topSpeed),
          answers.wheels
        );
        this.vehicles.push(newMotorbike);
        console.log('Motorbike created successfully!');
        this.startCli();
      });
  }

  // Method to perform actions on the selected vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action to perform",
          choices: ["Start", "Accelerate", "Decelerate", "Stop", "Turn", "Reverse", "Exit"],
        },
      ])
      .then((answers) => {
        const vehicle = this.getSelectedVehicle();
        if (!vehicle) {
          console.log("No vehicle selected.");
          return;
        }

        switch (answers.action) {
          case "Start":
            if (this.isDriveable(vehicle)) {
              vehicle.start();
            } else {
              console.log("This vehicle cannot start.");
            }
            break;
          case "Accelerate":
            if (this.isDriveable(vehicle)) {
              vehicle.accelerate(5);
            } else {
              console.log("This vehicle cannot accelerate.");
            }
            break;
          case "Decelerate":
            if (this.isDriveable(vehicle)) {
              vehicle.decelerate(5);
            } else {
              console.log("This vehicle cannot decelerate.");
            }
            break;
          case "Stop":
            if (this.isDriveable(vehicle)) {
              vehicle.stop();
            } else {
              console.log("This vehicle cannot stop.");
            }
            break;
          case "Turn":
            if (this.isDriveable(vehicle)) {
              vehicle.turn("right");
            } else {
              console.log("This vehicle cannot turn.");
            }
            break;
          case "Reverse":
            if (this.isDriveable(vehicle)) {
              vehicle.reverse();
            } else {
              console.log("This vehicle cannot reverse.");
            }
            break;
          case "Exit":
            this.exit = true;
            console.log("Exiting...");
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
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
