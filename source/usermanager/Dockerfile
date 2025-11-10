FROM maven:3-openjdk-17-slim AS build
ENV TZ="Asia/Kolkata"
WORKDIR /usr/src/app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /usr/src/app/target/usermanagement-*.jar usermanager.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "usermanager.jar"]