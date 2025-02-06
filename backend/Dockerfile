# Stage 1: Build the Spring Boot application
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies (This prevents re-downloading them during rebuild)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot application
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage to the runtime container
COPY --from=build /app/target/ /app/

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/app/sistemaReserva-1.0.0-SNAPSHOT.jar"]
