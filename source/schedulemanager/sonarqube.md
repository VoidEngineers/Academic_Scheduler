to integrate the sonarqube we need to first run the docker-compose file

docker-compose up -d

then make sure the sonarqube is running

docker ps

go to the http://localhost:9000 and login with the default credentials

sonar.login=admin
sonar.password=admin

after logging in we can create a new project

create a new project

project key: mongodb-springboot (this is the name/artifactId of the project)

name: mongodb-springboot

after that click the manual analysis button

there will be a token generator and need gen a code and copy it

sonar.token="<token>"

then run

```sh
mvn clean install

mvn dependency-check:aggregate -PsonarReports # to generate the dependency check report

mvn clean verify sonar:sonar -D"sonar.projectKey=ITPM-Academic_Scheduler_2" -D"sonar.host.url=http://localhost:9000" -D"sonar.login=sqp_8f70425819ef1d67d0d66da31aea5eb5433c4555" -X # to run the sonar scan and sync with the sonar server
```
