Steps to run the project:

1- Clone the repository on your local machine <br/>
2- Run the command `npm install` to install all the dependencies <br/>
3- Install postgresql on your machine <br/>
4- Create a database named "dashboarddevdb" in postgresql <br/>
5- Update the database url in the .env file to match your own local database url <br/>
6- Run the command `npm run typeorm migration:run` to run the migrations and create the tables in the database <br/>
7- Run the command `npm run start:dev` to start the server <br/>

link to the frontend repository (steps to run the frontend are in the readme file of the frontend repository): <br/>
https://github.com/TheYMK/dashboard-frontend
