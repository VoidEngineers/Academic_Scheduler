# Stage 1: Build the Maven project
FROM maven:3-openjdk-17-slim AS build

# Set the timezone to Asia/Kolkata
ENV TZ="Asia/Kolkata"

# Set the working directory
WORKDIR /usr/src/app

# Copy the Maven project files
COPY pom.xml ./
COPY src ./src

# Run Maven to build the project
RUN mvn clean install

# Stage 2: Create the final image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /usr/src/app/target/mongodb-springboot-0.0.1-SNAPSHOT.jar mongodb-springboot-0.0.1-SNAPSHOT.jar

# Execute the application
ENTRYPOINT ["java", "-jar", "mongodb-springboot-0.0.1-SNAPSHOT.jar"]