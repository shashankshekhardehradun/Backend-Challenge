# challenge

## Node.js Backend Challenge: Insurance Policy Quote Integration

### Requirements:
Docker Version 25.0.2
pgadmin 4v8

### Execution Instructions:

You need to build using the following command:
```docker-compose up --build```

Open your browser on localhost:3000 so that you can use the application.

To visualize the updates in the database, use the following steps:
* Find the name of the container using ```docker ps```
* Then, run the command ```docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id``` to return the container's IP address.
* Open up the web UI of pgadmin, and enter the IP Address and Host, and port 5432 along with the database name to connect to the database.
* Once connected, you can use the query tool in pgadmin to run queries on the database.

For testing, follow these steps:
* ```docker ps```
* Using the name of the backend server obtained above, run ```docker exec -it <name-of-backend-server> npm test```
* Stop the application by typing ```docker-compose stop```

### Directory Structure:

Backend-Challenge
 |   
 +-- challenge
 |  |  
 |  +-- db
 |  |
 |  +-- src // This contains the entrypoint of the code (app.ts).
 |  |      |
 |  |      +-- config // Contains db.ts to initialize the database
 |  |      |
 |  |      +-- controller // Contains get.controller.ts and post.controller.ts
 |  |      |
 |  |      +-- public // Contains the frontend of the website
 |  |      |
 |  |      +-- app.ts
 |  |
 |  +-- test // Contains the Integration Testing suite
 |    
 +-- gitignore
 |    
 +-- README.md

 ### API Endpoints:
The API endpoints have been implemented as described in the challenge description.

### Database:
The database details are stored in a db.ts file within config in the src directory. The database contains 4 tables: Users, Cars, Quotes, and CarQuotes (junction table).

### Error Handling:
Comprehensive testing has been done, with 100% jest coverage, as shown in the test coverage report.
