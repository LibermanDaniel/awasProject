# Applied Web Application Security: Project

This project is prepared for final evaluation of Applied Web Application Security: Attacks and Defense TX00CR92-3006.<br>
It provides a simple web application with security flaws that can be exploited using different attack vectors.<br>

#### Contributors
* Alex Franko
* Daniel Liberman
* Pavel Arefyev

## Installation

Web application is running on local [NodeJS server](https://nodejs.org/en/).<br>
In order to use the application for training, NodeJS as well as dependencies must be installed.<br>
Navigate to the root folder of application (repository) and run the following:
```
npm install bcrypt ejs express express-session md5 mongoose passport passport-local sqlite3
```
After the required modules are install, the server can be started either by running index file
or executing the npm command:
```
node index.js
  or
npm run dev
```
The application is now available at [http://localhost:3000](http://localhost:3000).

## Technology stack
The application is using the following technology stack:

| Technology          | Description                       | 
|---------------------|-----------------------------------|
| **NodeJS**          | Web application engine technology |
| **BCrypt**          | Password hash generation          |
| **EJS**             | Templating/rendering language     |
| **Express**         | Web application framework         |
| **Express-session** | Session handling middleware       |
| **Mongoose**        | MongoDB javascript driver         |
| **Passport**        | Authentication middleware         |
| **Passport-local**  | Passport extension                |
| **Passport-local**  | Passport extension                |
| **SQlite3**         | SQLite javascript driver          |

## Application overview

There are three vulnerabilities that the application allows to exploit:
* SQL injection
* Client-side input restrictions
* Username/password enumeration

To find more information about application functionality, refer to the [User Manual](./User%20Manual.pdf).

