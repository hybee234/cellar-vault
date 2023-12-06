# cellar-vault

<a ID="readme-top"></a>

<div align="center">

# Cellar Vault'S Database

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en)
[![Inquirer Badge](https://img.shields.io/badge/Inquirer-red)](https://www.npmjs.com/)
![MySQL2 Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

</div>


## Description

Cellar Vault is a comprehensive database solution designed for efficiently managing and monitoring wine inventory transactions. This user-friendly software is equipped with an intuitive interface that simplifies the tracking of wine quantities and their movements within your cellar.

Key Features:

    - Transaction Logging: Cellar Vault excels in recording both inbound and outbound wine transactions, providing you with a detailed history of your wine inventory movements.

    - Interactive User Interface: Enjoy a seamless experience as you explore the Cellar Vault interface, which allows you to    effortlessly view essential information such as Brand, Vintage, and Wine Name right from the start.

    - Streamlined Management: Cellar Vault empowers users with the ability to delete or deactivate brands, vintages, or individual wines when necessary. Keeping your database clean and up-to-date is a breeze.

    - Real-time Updates: Stay in control by interacting with and updating server records directly from the frontend. Cellar Vault ensures that your wine inventory information remains accurate and accessible.


This application has been developed from scratch

## Table of contents

- <a href="#user-story">User Story</a>
- <a href="#user-acceptance-criteria">User Acceptance Criteria</a>
- [Installation](#installation)
- [Usage](#usage)
- <a href="#video-screenshots">Video and Screenshots</a>
- [License](#license)
- [Contributing](#contributing)
- [Testing](#testing)
- <a href="#technologies-used">Technologies Used</a>
- [Questions](#questions)

## User Story <a ID="user-story"></a>

This application was developed with this user story in mind:

```
I WANT to efficiently track and manage wine brands, vintages, and inventory transactions

SO THAT I can maintain a well-organized and up-to-date record of my wine cellar, enabling better planning and management of my wine inventory.
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria <a ID="user-acceptance-criteria"></a>

### This application was developed with the below User acceptance criteria:

```
WHEN I Use Node.js and Express.js to create a RESTful API.

WHEN I Use Handlebars.js as the templating engine.

WHEN I Use MySQL and the Sequelize ORM for the database.

WHEN I Have both GET and POST routes for retrieving and adding new data.

WHEN I Be deployed using Heroku (with data).

WHEN I Use at least one new library, package, or technology that we haven’t discussed.

WHEN I Have a polished UI.

WHEN I Be responsive.

WHEN I Be interactive (i.e., accept and respond to user input).

WHEN I Have a folder structure that meets the MVC paradigm.

WHEN I Include authentication (express-session and cookies).

WHEN I Protect API keys and sensitive information with environment variables.

WHEN I Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

WHEN I Have a quality README (with a unique name, description, technologies used, screenshot, and link to the deployed application).


```


#### Bonus features


In addition to the core functionality, "Cellar Vault" offers the following optional features:

* Email Notifications: Receive personalized email notifications upon signing in to Cellar Vault. Get a warm welcome message and 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Video and Screenshots <a ID = "video-screenshots"></a>

### Video

Watch this video to learn more about the application

<a href="https://drive.google.com/file/d/1F-TxUnNaoULuqn5DTNpz_jC-25aPx1c2/view"> Video - "How to: Huber's Employee Tracker" </a>

### Screenshots

Screenshot of the application during "Login/signup"
* Note the headings rendered with colour schemes used
* Note formatting and use of icons and colours across the application

<div align="center">


![Screenshot of the application in flight](./lib/images/LoginPage.png)

</div>

Screenshot of the application during "Interaction with Edit Form"


<div align="center">

![Screenshot of the application during "Delete Employee" process](./lib/images/BrandNameEdit.png)

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

1/ Clone or fork the repository to your local machine.

2/ Open your terminal or command prompt and navigate to the project's root directory.

3/ Run the following command to install the necessary npm packages:

    - npm install

 4/ This will install the required dependencies, including bcrypt, connect-session-sequelize, dotenv, express, express-handlebars, express-session, mysql2, nodemailer, and sequelize.

5/ After the npm packages have been successfully installed, you need to set up your MySQL database for the application to read and write to.

6/ Log into MySQL using the following command (replace root with your MySQL username if it's different):

    - mysql -u root -p

7/ Once you are logged into MySQL, create the database with the provided schema by running the following command from the project's root folder (ensure you are at the root folder):

    - source ./db/schema.sql

8/ After executing the schema.sql script, exit MySQL by running:
    - Quit

9/ You can now run the "Cellar Vault" application. Start the server by running the following command:
    - npm start
        Or
    - npm run dev

 10/ Your "Cellar Vault" application should now be up and running. You can access it by opening a web browser and navigating to the appropriate URL 
 
    - (typically http://localhost:3000).

11/ These installation steps cover the setup of your application and its dependencies, allowing you to run "Cellar Vault" locally on your machine.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Once in, you will immediately be presented with the Log in Page which serves as the "User Home Page" to the application.

From here it is a matter of navigating through the processes to view, add, remove records from the database following prompts on the screen. Once processes are progressed to completion (or cancelled) the application will return back to the main menu to await the next process.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
    
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application can be used in conjunction with licensing covered in  <b>MIT Lcensee</b>

(Click on the badge for details of the license)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

To contribute to this application, please reach out to me via my contact details below

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

Automated Test scripts have not been developed for this application

### Main Menu
* Validate that the main menu launches with a red heading "Main Menu"
* Validate that the main menu options have coloured icons against them to improve selection (blue "chart" icon for view, green "plus icon" for add, "pencil" for update, crossed out circle for delete)
* Validate that the Main Menu displays up to 12 rows of options


### View all Departments
* Validate that selecting View all departments presents you with two options - summary view and detailed view
* Validate that Summary view displays one record for each department AND that a heading "Summary View of Departments" appears
* Validate that Detailed view desplays all departments and its associated Roles and Employees AND that a heading "Detailed View of Departments" appears the department can appear multiple times in this format (once for each role and employee) 
* Validate that viewing either view will bring you back to the main menu

### View all Roles
* Validate that a purple heading in a box is rendered with text "view all roles"
* Validate that viewing all roles presents you with a table of all Roles (Role ID, Role, Salary, Department)
* Validate that Salary is presented formatted as currency
* Validate that you are returned to main menu after presented with the table

### View all Employees
* Validate that a purple heading in a box is rendered with text "View all Employees"
* Validate that viewing all employees presents you with a table of all emlpoyees (Employee_ID, Name, Department, Role, Salary, Manager)
* Validate that Salary is presented formatted as currency
* Validate that you are returned to main menu after presented with the table

### View all Employees by Manager

* Validate that a purple heading in a box is rendered with text "View all Employees by Manager"
* Validate that you are presented with a list of staff to select from, these options should also be formatted with colour to make it easier to identify employee_ID and name
* Validate that when you select a staff member from the list, a table is presented with employees who have your chosen employee as their manager 
* Validate that Salary is presented formatted as currency
* Validate that you are returned to main menu after presented with the table

### View all Employees by Department

* Validate that a purple heading in a box is rendered with text "View all Employees by Department"
* Validate that you are presented with a list of Departments to select from, these options should also be formatted with colour to make it easier to identify Department ID and Department Name
* Validate that when you select a Department from the list, a table is presented with employees in the department. 
* Validate that Salary is presented formatted as currency
* Validate that you are returned to main menu after presented with the table

### View Total Salary for Department

* Validate that a purple heading in a box is rendered with text "View Total Salary for Department"
* Validate that you are presented with a list of Departments to select from, these options should also be formatted with colour to make it easier to identify Department ID and Department Name
* Validate that there is also a "Show summary for all Departments" option with a red "sigma icon"
* Validate that selecting a department produces a table with a Salary total for the selected department only
* Validate that selecting the "Show Summary for all Departments" option produces a table that shows the salary total for ALL departments
* Validate that Salary is presented formatted as currency (in both tables)
* Validate that you are returned to main menu after presented with the table

### Add Department
* Validate that a purple heading in a box is rendered with text "Add New Department"
* Validate that you are presented with a question for the name of the new department
* Validate that once you have submitted the new department name, that you are presented with a table showing the Department ID and Department name with a confirmation message of success
* Validate that you are automatically returned to the main menu after the addition

### Add Role
* Validate that a purple heading in a box is rendered with text "Add New Role"
* Validate that you are presented with a list of departments to select from, the first option is to cancel adding the new role and to return to main menu, the second option is to create a New department followed by all available departments in the database to select from.
* Validate that the list options are colour formatted to make it easier to see values
* Validate that select "cancel and return to main menu" brings you to the main menu
* Validate that selecting "Create New Department" steps you through the process to create a new department - importantly, the user is not returned back to the main menu after adding a new department, the application is expected to continue with the process of adding the new role (utilising the newly created department)
* Validate that once a department is selected (either through selection or creation) that you are guided through questions to arrive at a new Role (Title, Salary)
* Validate that Salary has data validation configured (i.e. only numbers can be accepted)
* Validate that Once the Role is created - that the user is presented with a table displaying the individual role with a message indicating success
* Validate that you are returned to the main menu once the new Role is added
* Validate that restarting an add Role process after cancelling out does not produce errors (lingering await functions that have not been address will throw errors when this happens)

### Add Employee

* Validate that a purple heading in a box is rendered with text "Add New Employee"
* Validate that you are first prompted for employees first and last name

#### Select Role
* Validate that you are next presented a list to determine employees Role.
* Validate that there is a Cancel and Create new role option along with all existing Roles in the database
* Validate that the Roles list is colour coded to improve readability
* Validate that selecting Cancel brings you back to the main menu
* Validate that selecting "Create New ROle for this Employee" steps you through the process to create a new Role - importantly, the user is not returned back to the main menu after creating a new Role, the application is expected to continue with the process of adding the new employee (utilising the newly created role)
* Validate that once the Role is selected (either by creating a new one or selecting an existing one), that the user is next brought to selecting Manager

#### Select Manager
* Validate that the user is presented with a list of employees that includes an option to cancel out of the process and return to main menu
* Validate that cancelling brings the user back to the main menu
* Validate that selecting a manager progresses to the end of employee creation
* Validate that a table is presented to the user with details of the newly created employee and a confirmation message of success
* Validate that that user is returned to the main menu

### Update Employee (Role/Manager)
* Validate that when selecting "Update Employee (ROle/Manager) - that a purple heading in a box is rendered with text "Update Employee (Role/Manager)"
* Validate that the user is automatically presented with a table of existing employees to view
* Validate that the user is presented with a list of employees to select from
* Validate that the user is presented with the options to update the Employees Role or Manager

#### Update Role
* Validate that selecting Role presents the user with all roles on a table, and a formatted list of Roles is made available to pick from
* Validate that selecting a Role updates the employees Role, a table with the employees record will display together with a message indicating success
* Validate that that user is returned to the main menu

#### Update Manager
* Validate that selecting Manager presents the user with all Employees on a table, and a formatted list of Employees is made available to pick from
* Validate that selecting a Manager updates the employees Manager, a table with the employees record will display together with a message indicating success
* Validate that that user is returned to the main menu

### Delete Department
* Validate that when selecting Delete Department, the user is presented the option of a Summary View or Detailed view and that selecting the option displays the corresponding table
* Validate that when selecting the Department View, that the user is not brought back to the main menu and remains within the process of deleting a department, the user is expected to be presented with a formatted list of Departments to select from with the top option being a cancel option
* Validate that selecting the cancel option brings the user back to the main menu
* Validate that when the user selects a department, that a table showing all associated Roles and employees is presented for the user to review, a warning prompt will also display with a final confirmation on whether to proceed with delting the department
* Validate that selecting No cancels the request and returns the user to the main menu
* Validate that selecting Yes deletes the Department, displays a message of success and brings the user back to the main menu

### Delete Role
* Validate that when selecting Delete Role, that the user is presented with a table of all Roles and a formatted list of Roles to select from with the top option being a cancel option
* Validate that selecting the cancel option brings the user back to the main menu
* Validate that when the user selects a Role, that a table showing all associated Employees is presented for the user to review, a warning prompt will also display with a final confirmation on whether to proceed with delting the role
* Validate that selecting No cancels the request and returns the user to the main menu
* Validate that selecting Yes deletes the Role, displays a message of success and brings the user back to the main menu

### Delete Employee
* Validate that when selecting Delete Employee, that the user is presented with a table of all Employees and a formatted list of RoEmployees to select from with the top option being a cancel option
* Validate that selecting the cancel option brings the user back to the main menu
* Validate that when the user selects an Employee, that a table showing the Employees record is presented for the user to review, a warning prompt will also display with a final confirmation on whether to proceed with delting the employee
* Validate that selecting No cancels the request and returns the user to the main menu
* Validate that selecting Yes deletes the Employee, displays a message of success and brings the user back to the main menu

### Quit
* Validate that selecting quit terminates the application with a pleasant message saying "Thanks for dropping by!"


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies used <a ID="technologies-used"></a>

* Javascript
* Node.js
* Node Package Manager (NPM)
* MySQL2
* Inquirer
* dotenv

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Questions

- Visit my GitHub page: <a href="https://github.com/hybee234"> hybee234 </a>
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

