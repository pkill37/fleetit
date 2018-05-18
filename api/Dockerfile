FROM maven:3.5-jdk-9-slim as build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
RUN mvn dependency:resolve-plugins
COPY . .
RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:9-jre-slim
WORKDIR /app
COPY --from=build /app/target/ /app
CMD ["java", "-jar", "api-0.0.1.jar"]

