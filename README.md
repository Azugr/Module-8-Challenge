Vehicle Builder - TypeScript Command-Line Application

Description

    Vehicle Builder is a command-line application built with TypeScript that allows users to create and interact with different types of vehicles, including cars, motorbikes, and trucks. Users can create a new vehicle or select an existing one, and then perform various actions specific to each vehicle type. The application uses the Inquirer package for user input and demonstrates object-oriented principles by implementing classes for each vehicle type.

Features

    Vehicle Creation: Choose between car, truck, or motorbike.
    Vehicle Interaction: Perform specific actions with the selected vehicle.
    Type-Specific Prompts: Trucks and motorbikes prompt users for additional details that are not applicable to cars.
    Persistent Action Menu: After each action, return to the main menu until the user decides to exit.

Installation

    Clone this repository:

    git clone https://github.com/Azugr/Module-8-Challenge.git

Navigate to the project folder:

    cd Module-8-Challenge

Install the dependencies:

    npm install

Usage

    To start the application, use the following command:

npm start

    Follow the prompts to create or select a vehicle and perform actions with it.

Walkthrough Video

    A walkthrough video demonstrating the application's functionality, including creating vehicles and performing actions, can be found here.

User Story

    AS a developer
    I WANT to update an existing application to include additional vehicle types
    SO THAT I am able to comprehend and work with existing code bases.

Acceptance Criteria

    Users can create or select a vehicle.
    Vehicle types include car, truck, and motorbike.
    Prompts request details based on vehicle type.
    Actions can be performed with each vehicle, with trucks having unique actions.
    Users can continue performing actions until they choose to exit.

Technologies Used

    TypeScript: For object-oriented structure and type safety.
    Inquirer: For interactive command-line prompts.

Limitations

    Data Persistence: This application does not save vehicle data between sessions. Once the application is closed, all created vehicles are lost.
    
    Limited Error Handling: User inputs are minimally validated, so unexpected inputs could cause errors or unexpected behavior.
    
    No Deployment: This application is intended to run locally in a command-line environment and is not designed for deployment as a web or mobile application.
    
    Limited Extensibility: The code structure may require significant changes to add additional vehicle types or new functionality.
   
    Command-Line Interface: The user interface is text-based, which may not be user-friendly for those unfamiliar with command-line applications.
    
    Inquirer Package Dependency: If there are issues with the Inquirer package or updates that introduce breaking changes, the application may fail to function correctly.

License

    This project is licensed under the MIT License. See the LICENSE file for details.