Steps to run the project:

1- Clone the repository on your local machine
2- Run the command `npm install` to install all the dependencies
3- Install postgresql on your machine
4- Create a database named "dashboarddevdb" in postgresql
5- Update the database url in the .env file to match your own local database url
6- Run the command `npm run typeorm migration:run` to run the migrations and create the tables in the database
7- Run the command `npm run start:dev` to start the server

link to the frontend repository (steps to run the frontend are in the readme file of the frontend repository):
https://github.com/TheYMK/dashboard-frontend
