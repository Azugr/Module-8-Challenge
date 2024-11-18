Vehicle Builder - TypeScript Command-Line Application
Description

Vehicle Builder is a command-line application built with TypeScript that allows users to create and interact with different types of vehicles, including cars, motorbikes, and trucks. Users can create a new vehicle or select an existing one, and then perform various actions specific to each vehicle type. The application uses the Inquirer package for user input and demonstrates object-oriented principles by implementing classes for each vehicle type.

Table of Contents

    Description
    Features
    Installation
    Usage
    Walkthrough Video
    User Story
    Acceptance Criteria
    Technologies Used
    Limitations
    Future Improvements
    Contributing
    License

Features

    Vehicle Creation: Choose to create a car, truck, or motorbike, each with unique attributes.
    Vehicle Interaction: Perform specific actions such as starting, accelerating, decelerating, stopping, turning, and reversing with any selected vehicle.
    Type-Specific Prompts: Each vehicle type prompts users for relevant details. For example, trucks prompt for towing capacity, while motorbikes enable wheelie actions.
    Persistent Action Menu: After performing an action, users are returned to the main menu, allowing multiple actions until they choose to exit.
    Validation: Input validations ensure that users provide realistic and acceptable values for vehicle properties.

Installation

    Clone the repository:

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

    ## Video Walkthrough

    Watch the walkthrough video demonstrating the functionality of the Vehicle Builder: https://drive.google.com/file/d/1-V19OzJwm1c2amUO6OFdnKwHhc_GcCMC/view?usp=sharing


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
    Node.js: JavaScript runtime environment.
    Inquirer: For interactive command-line prompts.

Limitations

    Data Persistence: This application does not save vehicle data between sessions. Once the application is closed, all created vehicles are lost.
    Limited Error Handling: User inputs are minimally validated, so unexpected inputs could cause errors or unexpected behavior.
    No Deployment: This application is intended to run locally in a command-line environment and is not designed for deployment as a web or mobile application.
    Limited Extensibility: The code structure may require significant changes to add additional vehicle types or new functionality.
    Command-Line Interface: The user interface is text-based, which may not be user-friendly for those unfamiliar with command-line applications.
    Inquirer Package Dependency: If there are issues with the Inquirer package or updates that introduce breaking changes, the application may fail to function correctly.

Future Improvements

    Data Persistence: Implement functionality to save and load vehicles from a database or file system to maintain data between sessions.
    Enhanced Error Handling: Improve validation for user inputs to handle unexpected or incorrect entries gracefully.
    Additional Vehicle Types: Expand the application to include more vehicle types, such as bicycles or boats, to demonstrate versatility.
    Graphical User Interface (GUI): Develop a GUI version of the application for a more user-friendly experience.
    Unit Testing: Add unit tests to ensure code reliability and facilitate future development.
    Plugin System: Create a plugin architecture to allow easy addition of new vehicle types and functionalities.

Contributing

    Contributions are welcome! Please follow these steps to contribute:

        ork the repository.

    Create a new branch for your feature or bug fix:

        git checkout -b feature/YourFeatureName

    Commit your changes:

        git commit -am 'Add some feature'

    Push to the branch:

        git push origin feature/YourFeatureName

    Submit a pull request detailing your changes.

License

    This project is licensed under the MIT License. See the LICENSE file for details.