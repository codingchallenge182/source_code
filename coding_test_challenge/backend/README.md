## Requirements to run the backend

  You must have the following installed:
  
 - Docker
 - Java 17+
 - Maven
 - PostgreSQL locally
   

## How to build the backend without Docker 

1. Ensure that you have your Postgres database running and that the credentials match the `application.properties` file
2. Run `mvn clean install`
3. Run `spring-boot-run`

By default, the backend will start at: `http:localhost:8080`

## How to run the backend with Docker
1. Build the Docker image: `docker build -t backend-app .`
2. Run the container using: `docker compose up -d`

The backend will be accessible at `http:localhost:8080`