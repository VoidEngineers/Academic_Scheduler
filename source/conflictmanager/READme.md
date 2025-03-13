# configManager

## Requirements

- [IntelliJ IDEA](https://www.jetbrains.com/idea/download)
- [Amazon Corretto 17](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html) or higher
- [Maven 3.2.5](https://maven.apache.org/download.cgi) or higher

## Maven dependencies

            <dependency>
    		<groupId>org.springframework.boot</groupId>
    		<artifactId>spring-boot-starter-web</artifactId>
    	</dependency>
    	<dependency>
    		<groupId>org.springframework.boot</groupId>
    		<artifactId>spring-boot-starter-data-mongodb</artifactId>
    	</dependency>
    	<dependency>
    		<groupId>org.springframework.boot</groupId>
    		<artifactId>spring-boot-devtools</artifactId>
    		<scope>runtime</scope>
    		<optional>true</optional>
    	</dependency>
    	<dependency>
    		<groupId>org.projectlombok</groupId>
    		<artifactId>lombok</artifactId>
    		<optional>true</optional>
    	</dependency>

## Build and run the project

### Steps to build the project locally

pre-requisites:

- Make sure to change the MongoDB URL in application.yml file
- Create your own truststore and add AWS document DB keys to it
- Make sure to change the 'KEY_STORE_TYPE' variable in 'src/main/java/com/service/configManager/config/DocumentDBConf.java'

Steps to create truststore and keystore files:

Note - This step is not required if you are running the project on docker

- copy your cacerts file from your jdk folder (ex - .jdks\corretto-17.0.10\lib\security\cacerts ) to your project folder (ex - discoveryService)
- rename the cacerts file as 'rds-truststore.jks'
- run 'genkeystore.sh' file to generate keystore file (This will add the AWS Document DB keys to the keystore file)

Add the following properties to application.yml (src/main/resources/application.yml) file:

```spring:
  application:
    name: configManager
  data:
    mongodb:
      auto-index-creation: true
      uri: mongodb://nexadbtest:xxxxxxx
      database: testDB

server:
  port: 8082

```

Steps:

- Add `<packaging>jar</packaging>` to pom.xml of configManager service
- delete target folder (compiled files) inside configManager
- run `mvn clean install` in configManager directory
- jar file should be created inside target folder if the build is success
- run `java -jar target/configmanager-0.0.1-SNAPSHOT.jar` to run the jar file or 'mvn spring-boot:run' to run the project

### Steps to run the project on docker

- run `mvn clean install` in configManager directory
- run `docker build -f Dockerfile.prod -t configmanager .` in configManager directory
- run `docker run -p 8082:8082 configmanager` to run the docker image
- discoveryService service should be running on port 8082

## References

- Configure AWS DocumentDB with SSL - https://aws.amazon.com/blogs/database/integrate-your-spring-boot-application-with-amazon-documentdb/
