# How to use this application

This application lives inside a mono repo consisting of a backend and frontend repo.

# Development Requirements 

To be able to develop and build this application you need:

- Docker
- Java 17+
- Maven
- npm
- PostgreSQL locally

# How to run the application with Docker

1. Ensure you are in the root of `coding_test_challenge` repo
2. Run `docker compose build`
3. Run `docker compose up -d`
Note: it will take a few minutes for the backend Dockerfile to build 

The frontend will be accessible at: [http://localhost:3000/tasks](http://localhost:3000/tasks)  
The backend can be accessed at: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

# How to run the backend without Docker

1. Ensure you are in the backend repo
2. Ensure that you have your Postgres database running and that the credentials match the `application.properties` file
3. Run `mvn clean install`
4. Run `spring-boot:run`


# How to run the frontend without Docker
1. Ensure you are in the frontend repository by using the following commands 
 ```bash
cd frontend 
cd frontend2
cd frontend  
```
2. Install the project dependencies by running:
   ```bash
   npm install
3. Start the development server by running `npm start`
